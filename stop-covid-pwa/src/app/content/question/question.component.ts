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
  @Input() public answerValue: any; // existing answer to prefill choices
  @Output() public answerValueChange = new EventEmitter<any>();
  @Input() public mode?: 'preview';
  // @Input() public mode?: 'preview' = 'preview';

  public question: any;
  public answerChoices: any[];
  public note: any;

  public currentPath: string;

  private subscription: Subscription = new Subscription();

  constructor(private translate: TranslateService) {
    // this.answerValue = {};
  }

  ngOnInit(): void {
    this.reloadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('QuestionComponent.ngOnChanges', changes);
    if (changes.id) {
      this.id = changes.id.currentValue;
      this.reloadData();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Detect changes on answer choice
   * @param changes is object with changes
   */
  public onChangeAnswerChoice(changes) {
    this.answerValue[changes.source.value] = changes.checked;
    this.answerValueChange.emit(this.answerValue);
  }

  /**
   * Reload data for current question
   */
  private reloadData() {
    this.fetchTranslation();
    this.setupCurrentPath();
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
      // this.answerValue = {};
      this.note = [];

      for (const key of keys) {
        if (key === 'ANSWER_CHOICE') {
          this.answerChoices = Object.values(question[key]);
        } else if (key === 'NOTE') {
          this.note = Object.values(question[key]);
        } else {
          this.question.push(question[key]);
        }
      }

      // console.log(this.question);
    }));
  }

  /**
   * Store current path
   */
  private setupCurrentPath() {
    this.currentPath = window.location.pathname;
  }

}
