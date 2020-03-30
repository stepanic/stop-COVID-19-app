import { Injectable } from '@angular/core';
import { IAnswerConfigBinary, IAnswerConfigMultiple, AnswerType, AnswerBinary } from '../model/Answer';
import { StorageMap } from '@ngx-pwa/local-storage';
import { take } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CautionLevel } from '../model/Caution';

const BINARY_ANSWER: IAnswerConfigBinary = {
  type: AnswerType.BINARY,
  positive: {
    tid: 'CONFIG.QUESTION.ANSWER.TYPE.BINARY.NO',
  },
  negative: {
    tid: 'CONFIG.QUESTION.ANSWER.TYPE.BINARY.YES'
  }
};

const MULTIPLE_ANSWER: IAnswerConfigMultiple = {
  type: AnswerType.MULTIPLE,
  submit: {
    tid: 'CONFIG.QUESTION.ANSWER.TYPE.MULTIPLE.SUBMIT.NEXT',
  }
};

const ANSWERS_CONFIG = {
  Q01: BINARY_ANSWER,
  Q02: BINARY_ANSWER,
  Q03: BINARY_ANSWER,
  Q04: BINARY_ANSWER,
  Q05: BINARY_ANSWER,
  Q06: BINARY_ANSWER,
  Q07: BINARY_ANSWER,
  Q08: MULTIPLE_ANSWER,
  Q09: BINARY_ANSWER,
  Q10: BINARY_ANSWER,
  Q11: BINARY_ANSWER,
  Q12: BINARY_ANSWER,
  Q13: BINARY_ANSWER,
};

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor(
    private storage: StorageMap,
    private translate: TranslateService
  ) { }

  /**
   * Get translation ID from question ID
   * @param questionId is question ideniticator [1..N]
   */
  public getTranslationId(questionId: number) {
    return `Q${questionId.toString().padStart(2, '0')}`;
  }

  private getTranslationIdGlobal(questionId: number) {
    return `QUESTION.${this.getTranslationId(questionId)}`;
  }

  /**
   * Get answer configuration for specific question
   * @param questionId is question identificator [1..N]
   * @example this.questionsService.getAnswerConfig(this.questionId);
   */
  public getAnswerConfig(questionId: number) {
    const translationId = this.getTranslationId(questionId);
    return this.answersConfig[translationId];
  }

  /**
   * Get configurations for all answers
   */
  public get answersConfig() {
    return ANSWERS_CONFIG;
  }

  /**
   * Count questions
   */
  public get howManyQuestions() {
    return Object.keys(this.answersConfig).length;
  }

  public get isLocationInputRequired(): Promise<boolean> {

    return new Promise(async resolve => {

      // TODO: better query for the question
      // "Jeste li putovali izvan Hrvatske u poslijednjih 14 dana?"
      const answer = await this.getAnswer(9);

      if (answer?.value === 'NEGATIVE') {
        resolve(true);
      } else {
        resolve(false);
      }

      // console.log('odgovor je', answer);
    });

  }


  /**
   * Save answer
   * @param answer is answer object 
   */
  public storeAnswer(answer) {
    // console.log('storeAnswer', answer);

    // disable save without value
    if (!answer.value || Object.keys(answer.value).length === 0) {
      return;
    }

    // const type = answer.type;
    const key = this.getAnswerKey(answer.questionId);

    this.storage.set(key, answer).pipe(take(1)).subscribe();

  }

  /**
   * Get current answer value by questionId
   * @param questionId is question ideniticator
   */
  public getAnswer(questionId: number): Promise<any> {
    const key = this.getAnswerKey(questionId);

    // console.log(key);

    return new Promise((resolve, reject) => {
      this.storage.get(key).pipe(take(1)).subscribe(answer => {
        resolve(answer);
      });
    });
  }

  /**
   * Get all answers from the store
   */
  public getAnswers(): Promise<any> {

    return new Promise(async resolve => {

      const answers = [];
      for (const questionId of this.getQuestionIds()) {
        const answer = await this.getAnswer(questionId);
        answers.push(answer);
      }

      resolve(answers);
    });
  }

  /**
   * Get all answers with translations
   */
  // TODO: not finished
  public getAnswersTranslated(): Promise<any> {
    return new Promise(async resolve => {
      const answers = await this.getAnswers();

      for (const answer of answers) {
        const tid = this.getTranslationIdGlobal(answer.questionId);
        const translation = await this.translate.get(tid).toPromise();
        // console.log(translation);
      }
    });
  }

  /**
   * Erase all collected data
   */
  public clear() {

    // TODO: delete only everything starts with `ANSWER_` but not for example `lang`
    this.storage.clear().pipe(take(1)).subscribe();

    // console.log('QuestionsService.erase');
  }

  public async getCurrentCautionLevel() {

    // console.log('QuestionsService.getCurrentCautionLevel');

    const answers = await this.getAnswers();

    // BINARY
    // positive (healthy) answer NO => false => 0
    // negative (not healthy) answer YES => true => 1
    // MULTIPLE
    // empty (healthy) => false => 0
    // one or more => true => 1
    // detection vactor
    const A = [0]; // indicies 0..13 => questions 1..13
    // align question ID to array indicies with leading zero

    for (const answer of answers) {
      // console.log(answer);

      if (answer.type === AnswerType.BINARY) {
        if (answer.value === AnswerBinary.NEGATIVE) {
          A.push(1);
        } else {
          A.push(0);
        }
      } else if (answer.type === AnswerType.MULTIPLE) {
        if (Object.keys(answer.value).length) {
          A.push(1);
        } else {
          A.push(0);
        }
      }
    }

    // console.log('answers', answers);
    // console.log(A);

    // It is not able to detect caution level if every question is not answered
    if (Object.keys(ANSWERS_CONFIG).length !== (A.length - 1)) {
      return null;
    }

    // Count vector for easier comparing
    const count = A.reduce((a, b) => a + b, 0);

    // Q02 (temperatura) + Q03 (kasalj) + Q05 (kratkoca daha) => kritican
    if (count === 3 && A[2] && A[3] && A[5]) {
      return CautionLevel.CRITICAL;
    }

    // Q02 (temperatura) + bilo sto (Q03 kasalj ili Q04 bol u grlu ili Q05 kratkoca daha ili Q06 gubitak okusa/njuha)
    if (A[2] && (A[3] + A[4] + A[5] + A[6]) > 0) {
      return CautionLevel.CRITICAL;
    }

    // Q02 (temperatura) ili samo bilo koji respiratorni uz bilo koji PZGK 14 dana
    // prije početka tegoba ili uz mjeru izolacije = kritičan oprez
    if ((A[2] + A[3] + A[4] + A[5]) && (A[9] + A[10] + A[11] + A[12] + A[13]) > 0) {
      return CautionLevel.CRITICAL;
    }

    // Q02 Ako ima povišenu temperaturu + Q08 to kritičan je rizik
    if (A[2] && A[8] && count >= 2) {
      return CautionLevel.CRITICAL;
    }

    // Ako ima Q08 to + nešto biski kontakt kritčan je rizik
    if (A[8] && (A[11] || A[12])) {
      return CautionLevel.CRITICAL;
    }

    // Ako ima Q08 to+ 3 ili 4 ili 5 kritičan oprez
    if (A[8] && (A[3] || A[4] || A[5])) {
      return CautionLevel.CRITICAL;
    }

    // Ako ima Q08 to i pojava bolesti u Q13 zajednici ili Q10 visokorizična zanimanja tada kritičan oprez
    if (A[8] && (A[13] || A[10])) {
      return CautionLevel.CRITICAL;
    }

    // Q02 - SAMO temperatura => povecani
    if (count === 1 && A[2]) {
      return CautionLevel.HIGH;
    }

    // Q03 - SAMO kasalj => povecani
    if (count === 1 && A[3]) {
      return CautionLevel.HIGH;
    }

    // Q06 - SAMO gubitak njuha/okusa => povecani
    if (count === 1 && A[3]) {
      return CautionLevel.HIGH;
    }

    // Q11 Kontakt s osobom s potvrđenom COVIDOM bez simptoma Q02-Q06 povišeni rizik
    if (count === 1 && A[11]) {
      return CautionLevel.HIGH;
    }

    // Q13 Pojava bolesti > 2 u zajednici bez simptoma Q02-Q06 poviseni rizik
    if (count === 1 && A[13]) {
      return CautionLevel.HIGH;
    }

    // Q12 Samo kontakt s osobom pod mjerama izolacije povišeni rizik
    if (count === 1 && A[12]) {
      return CautionLevel.HIGH;
    }

    // Q01 Osoba u izolaciji bez simptoma Q02-Q06 povišeni rizik (povećani oprez)
    if (count === 1 && A[1]) {
      return CautionLevel.HIGH;
    }

    // Q01 Osoba u izolaciji sa bilo kojim simptomom Q02-Q06 kritičan oprez
    if (A[1] && (A[2] || A[3] || A[4] || A[5] || A[6])) {
      return CautionLevel.HIGH;
    }

    // Q01 Ako je osoba u samoizolaciji, a negativno je su Q02-Q07 osoba je visokorizična
    // to je pokriveno sa
    // Q01 Osoba u izolaciji bez simptoma Q02-Q06 povišeni rizik (povećani oprez)

    // Q08 Ako je osoba samo ima nešto od zimice/tresavice/boli u mišićima/iznemoglost (povećani je oprez)
    if (count === 1 && A[8]) {
      return CautionLevel.HIGH;
    }

    // Q07 - SAMO proljev/povracanje => srednji
    if (count === 1 && A[7]) {
      return CautionLevel.MEDIUM;
    }

    // SVE NE => nizak
    if (count === 0) {
      return CautionLevel.LOW;
    }

    // Default
    return CautionLevel.HIGH;

  }

  /**
   * Get answer's key in store from questionId
   * @param questionId is question ideniticator
   */
  private getAnswerKey(questionId: number): string {
    return `ANSWER_Q${questionId.toString().padStart(2, '0')}`;
  }

  /**
   * Get list of all question IDs
   */
  private getQuestionIds(): number[] {

    const iDs = [];

    for (const questionTID of Object.keys(this.answersConfig)) {
      // console.log('questionTID', questionTID);
      const questionId = parseInt(questionTID.substring(1), 10);
      // console.log('questionId', questionId);
      iDs.push(questionId);
    }

    return iDs;
  }
}
