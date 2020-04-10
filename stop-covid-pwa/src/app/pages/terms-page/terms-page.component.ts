import { Component, OnInit } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { QuestionsService } from 'src/app/content/services/questions.service';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss']
})
export class TermsPageComponent implements OnInit {

  constructor(
    private appBarService: AppBarService,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private questionsService: QuestionsService
  ) {
    // console.log('TermsPageComponent.constructor');
    // this.appBarService.Title = 'Uvjeti page constructor';
  }

  ngOnInit(): void {
    // console.log('TermsPageComponent.ngOnInit');
    // this.appBarService.Title = 'Uvjeti page ngOnInit';
    const routeData = this.route.snapshot.data;
    this.appBarService.Title = routeData.title.hr + ' / ' + environment.app.bar.title.hr; // TODO: handle with
    // this.appBarService.Title = routeData.title[this.translate.currentLang];

    // On init delete all answers (but not personal data)
    this.questionsService.clearAllAnswers();
  }

}
