import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public id: string;
  @Output() public changeAnswerChoice = new EventEmitter<any>();

  public question: any;
  public answerChoices: string[];


  private subscription: Subscription = new Subscription();

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.fetchTranslation();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.id = changes.id.currentValue;
    this.fetchTranslation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Detect changes on answer choice
   * @param changes is object with changes
   */
  public onChangeAnswerChoice(changes) {
    const choice = {};
    choice[changes.source.value] = changes.checked;
    this.changeAnswerChoice.emit(choice);
  }

  /**
   * Fetch question's translation
   */
  private fetchTranslation() {

    const translationId = `QUESTION.Q${this.id.toString().padStart(2, '0')}`;

    this.subscription.add(this.translate.stream(translationId).subscribe((question: any) => {
      const keys = Object.keys(question);

      this.question = [];
      this.answerChoices = null;

      for (const key of keys) {
        if (key === 'ANSWER_CHOICE') {
          this.answerChoices = Object.values(question[key]);
        } else {
          this.question.push(question[key]);
        }
      }

      // console.log(this.question);
    }));
  }

}
