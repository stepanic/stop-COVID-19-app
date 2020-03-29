import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionComponent } from './question/question.component';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AboutAuthorsComponent } from './about-authors/about-authors.component';
import { AboutAppComponent } from './about-app/about-app.component';
import { AboutGeneralHygieneComponent } from './about-general-hygiene/about-general-hygiene.component';
import { AboutCovid19Component } from './about-covid19/about-covid19.component';
import { IntroComponent } from './intro/intro.component';
import { AboutCovid19SymptomsComponent } from './about-covid19-symptoms/about-covid19-symptoms.component';



@NgModule({
  declarations: [
    QuestionComponent,
    AboutAuthorsComponent,
    AboutAppComponent,
    AboutGeneralHygieneComponent,
    AboutCovid19Component,
    AboutCovid19SymptomsComponent,
    IntroComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    MatCheckboxModule,
    RouterModule
  ],
  exports: [
    QuestionComponent,
    AboutAuthorsComponent,
    AboutAppComponent,
    AboutGeneralHygieneComponent,
    AboutCovid19Component,
    AboutCovid19SymptomsComponent,
    IntroComponent
  ]
})
export class ContentModule { }
