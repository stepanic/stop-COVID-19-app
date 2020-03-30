import { Injectable } from '@angular/core';
import { IAnswerConfigBinary, IAnswerConfigMultiple, AnswerType } from '../model/Answer';
import { StorageMap } from '@ngx-pwa/local-storage';
import { take } from 'rxjs/operators';

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

  constructor(private storage: StorageMap) { }

  /**
   * Get translation ID from question ID
   * @param questionId is question ideniticator [1..N]
   */
  public getTranslationId(questionId: number) {
    return `Q${questionId.toString().padStart(2, '0')}`;
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


  /**
   * Save answer
   * @param answer is answer object 
   */
  public storeAnswer(answer) {
    console.log('storeAnswer', answer);

    // disable save without value
    if (!answer.value) {
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
   * Erase all collected data
   */
  public erase() {

    // TODO: delete only everything starts with `ANSWER_` but not for example `lang`
    this.storage.clear().pipe(take(1)).subscribe();

    console.log('QuestionsService.erase');
  }

  /**
   * Get answer's key in store from questionId
   * @param questionId is question ideniticator
   */
  private getAnswerKey(questionId: number): string {
    return `ANSWER_Q${questionId.toString().padStart(2, '0')}`;
  }
}
