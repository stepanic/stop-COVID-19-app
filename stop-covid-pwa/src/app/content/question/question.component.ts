import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input() public id: string;
  public question: any;

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
    this.fetchTranslation();
  }

  private fetchTranslation() {
    this.translate.get('QUESTION.' + this.id).subscribe((question: any) => {
      this.question = Object.values(question);
    });
  }

}
