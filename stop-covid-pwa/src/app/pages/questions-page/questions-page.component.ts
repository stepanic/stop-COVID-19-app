import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/content/services/questions.service';
import { AnswerType, AnswerBinary } from 'src/app/content/model/Answer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions-page',
  templateUrl: './questions-page.component.html',
  styleUrls: ['./questions-page.component.scss']
})
export class QuestionsPageComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();

  public get AnswerType() { return AnswerType; }
  public get AnswerBinary() { return AnswerBinary; }

  public questionId: number;
  public answerConfig: any;
  public answerForCurrentQuestion: any;

  public multipleChoicesAnswer: any;

  public howManyQuestions: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) {
    this.howManyQuestions = this.questionsService.howManyQuestions;

    this.initPage();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Store answer to the question
   * @param type is type of the question
   * @param value is optional but it is passed for questions with binary answer, multiple choices answer is fetched async
   */
  public answer(type: AnswerType, value?: any) {

    if (value) {
      const answer = {
        questionId: this.questionId,
        type,
        value
      };

      this.questionsService.storeAnswer(answer);
    }

    // Automatic to next question on binary answer
    if (type === AnswerType.BINARY || type === AnswerType.MULTIPLE && !value) {
      const nextQuestionId = Math.min(this.questionId + 1, this.howManyQuestions);
      this.router.navigate(['/', 'pitanje', nextQuestionId]);
    }

    // After submited answer to last question redirect
    if (this.questionId === this.howManyQuestions) {
      // TODO: detect caution and then redirect
      this.router.navigate(['/', 'rezultati', 'oprez', 'srednji']);
    }

  }

  /**
   * Listen for the changes from listed answer choices
   * @param answerChoice is object with new checked answer choice
   */
  public onChangeAnswerChoice(answerChoice) {
    // console.log('new ac', answerChoice);

    const answer = {};
    for (const choice of Object.entries(answerChoice)) {
      if (choice[1]) {
        answer[choice[0]] = true;
      }
    }

    // DO NOT confirm answer here
    this.answer(AnswerType.MULTIPLE, answer);
  }

  private initPage() {
    this.checkRoute();
  }

  private checkRoute() {

    this.subscription.add(this.route.paramMap.subscribe(async (params) => {
      this.questionId = parseInt(params.get('questionId'), 10);

      console.log('this.questionId', this.questionId);

      this.questionsService.getAnswer(this.questionId).then(answer => {
        // console.log('answer je', answer);
        this.answerForCurrentQuestion = answer;
      });

      // this.multipleChoicesAnswer = await this.questionsService.getAnswer(this.questionId);

      // console.log('this.multipleChoicesAnswer', this.multipleChoicesAnswer);

      if (isNaN(this.questionId) || this.questionId > this.howManyQuestions) {
        this.router.navigate(['/']);
      }

      // console.log(this.questionId);

      this.setupQuestion();
    }));

    // It is wrong to look at the snapshot because navigation between the same component would not work
    // example /pitanje/7 => /pitanje/6
    // const params = this.route.snapshot.paramMap;
  }

  private setupQuestion() {
    this.answerConfig = this.questionsService.getAnswerConfig(this.questionId);
  }

}
