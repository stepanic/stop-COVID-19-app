import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/content/services/questions.service';
import { AnswerType, AnswerBinary } from 'src/app/content/model/Answer';
import { Subscription } from 'rxjs';
import { CautionLevel } from 'src/app/content/model/Caution';

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
  public answerValueForCurrentQuestion: any;

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
   * @param navigateToNextPage is flag does it should navigate to next page
   * @param value is optional but it is passed for questions with binary answer, multiple choices answer is fetched async
   */
  public answer(type: AnswerType, value: any, navigateToNextPage: boolean) {

    // Buidl answer object
    const answer = {
      questionId: this.questionId,
      type,
      value
    };

    // Store answer
    this.questionsService.storeAnswer(answer);

    // THIS IS BUG, it will avoid situation where no choice is checked
    // BINARY save always, MULTIPLE save only when no navigate to next page
    // if (type === AnswerType.BINARY || type === AnswerType.MULTIPLE && !navigateToNextPage) {
    // }

    if (navigateToNextPage) {
      // Automatic navigate to next page (question or results)
      const nextQuestionId = Math.min(this.questionId + 1, this.howManyQuestions);

      // After submited answer to last question redirect
      if (this.questionId === this.howManyQuestions) {
        this.navigateToCorrectCaution();
      } else {
        this.router.navigate(['/', 'pitanje', nextQuestionId]);
      }
    }
  }

  /**
   * Listen for the changes from listed answer choices
   * @param answerChoice is object with new checked answer choice
   */
  public onAnswerValueChange(answerChoice) {
    // console.log('QuestionsPage.onAnswerValueChange.answerChoice', answerChoice);

    const answerValue = {};
    for (const choice of Object.entries(answerChoice)) {
      if (choice[1]) {
        answerValue[choice[0]] = true;
      }
    }

    // Store answer but do not navigate to next page (do not call this.answer)
    this.answerValueForCurrentQuestion = answerValue;
    // This is protection to lose changes if /pojasnjenje/XXX is opened after making chnages
    this.answer(AnswerType.MULTIPLE, answerValue, false);
    // console.log('QuestionsPage.onAnswerValueChange.answerForCurrentQuestion', this.answerForCurrentQuestion);
  }

  private initPage() {
    this.checkRoute();
  }

  private checkRoute() {

    this.subscription.add(this.route.paramMap.subscribe(async (params) => {
      this.questionId = parseInt(params.get('questionId'), 10);

      // console.log('this.questionId', this.questionId);

      this.questionsService.getAnswer(this.questionId).then(answer => {
        // console.log('QuestionsPage.checkRoute.getAnswer', answer);
        if (answer && answer.value) {
          this.answerValueForCurrentQuestion = answer.value;
        } else {
          this.answerValueForCurrentQuestion = {};
        }
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

  private async navigateToCorrectCaution() {

      // Detect caution level from answered question
      const cautionLevel = await this.questionsService.getCurrentCautionLevel();

      // TODO: translate
      let oprez: 'nizak' | 'srednji' | 'povecani' | 'kritican' = null;

      switch (cautionLevel) {
        case CautionLevel.LOW: {
          oprez = 'nizak'; break;
        }
        case CautionLevel.MEDIUM: {
          oprez = 'srednji'; break;
        }
        case CautionLevel.HIGH: {
          oprez = 'povecani'; break;
        }
        case CautionLevel.CRITICAL: {
          oprez = 'kritican'; break;
        }
      }

      if (oprez) {
        this.router.navigate(['/', 'rezultati', 'oprez', oprez]);
      }
  }

}
