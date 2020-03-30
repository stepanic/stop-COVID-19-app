import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CautionLevel } from '../model/Caution';

@Component({
  selector: 'app-result-summary',
  templateUrl: './result-summary.component.html',
  styleUrls: ['./result-summary.component.scss']
})
export class ResultSummaryComponent implements OnInit, OnChanges {

  @Input() results: any;
  @Input() cautionLevel: CautionLevel;

  public get CautionLevel() { return CautionLevel; }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cautionLevel = changes.cautionLevel?.currentValue;
  }
}
