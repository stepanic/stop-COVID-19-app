import { Component, OnInit } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {

  lang: 'hr' | 'en';
  subtitle: string;
  cautionId: 'nizak' | 'srednji' | 'povecani' | 'kritican' | 'low' | 'medium' | 'high' | 'critical';

  isShareAvailable: boolean;

  constructor(
    private appBarService: AppBarService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {

    const navigator: any = window.navigator;
    if (navigator.share) {
      this.isShareAvailable = true;
    }
  }

  ngOnInit(): void {
    this.translate.get('CONFIG.RESULTS.TITLE.text').subscribe(resultsTitle => {
      this.translate.get('APP.TITLE.text').subscribe(appTitle => {
        this.appBarService.Title = resultsTitle + ' / ' + appTitle;
      });
    });

    this.cautionId = this.route.snapshot.params.cautionId;
    this.lang = this.route.snapshot.data.lang ? this.route.snapshot.data.lang : 'hr';
  }

  /**
   * Share app over navigator.share if it is available
   */
  public share() {

    const navigator: any = window.navigator;

    if (navigator.share) {
      // TODO: translate
      navigator.share({
        title: 'eTrijaža - #ostanidoma',
        text: 'Aplikacija je jednostavan upitnik za uzimanje anamneze osoba potencijalno inficiranih sa COVID-19.',
        url: window.location.origin
      });
    }
  }

}
