import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';



@NgModule({
  declarations: [
    QuestionComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatCheckboxModule,
    RouterModule
  ],
  exports: [
    QuestionComponent
  ]
})
export class ContentModule { }
