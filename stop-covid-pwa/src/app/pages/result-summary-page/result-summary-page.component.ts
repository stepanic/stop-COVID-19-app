import { Component, OnInit } from '@angular/core';
import { QuestionsService } from 'src/app/content/services/questions.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { environment } from 'src/environments/environment';
import { ScreenshotService } from 'src/app/content/services/screenshot.service';
import { CautionLevel } from 'src/app/content/model/Caution';

@Component({
  selector: 'app-result-summary-page',
  templateUrl: './result-summary-page.component.html',
  styleUrls: ['./result-summary-page.component.scss']
})
export class ResultSummaryPageComponent implements OnInit {

  public title: string;

  public appOrigin: string;
  public appHostName: string;

  headerData: {
    firstAndLastName: string;
    travelLocation?: string;
    travelReturnDate?: string;

    dateTimeNow?: string
  };

  // Enable Object.keys in the template
  get Object() { return Object; }

  public results: any;
  public cautionLevel: CautionLevel;

  constructor(
    private questionsService: QuestionsService,
    private storage: StorageMap,
    private appBarService: AppBarService,
    private screenshotService: ScreenshotService
  ) {

    this.appOrigin = window.location.origin;
    this.appHostName = window.location.hostname;
  }

  ngOnInit(): void {

    this.initPersonalData();
    this.initResults();

    // TODO: translate

    // this.appBarService.Title = 'PNG preuzimanje';
    // this.appBarService.Title = 'Odgovori / ' + environment.app.bar.title.hr;
    this.title = 'Odgovori / ' + environment.app.bar.title.hr;
  }

  private dateTimeNow() {

    const now = new Date();
    const date = now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear() + '.';
    const time = now.getHours() + ':' + now.getMinutes().toString().padStart(2,'0');
    const dateTime = date + ' ' + time;

    return dateTime;
  }

  /**
   * Get inserted personal data
   */
  private async initPersonalData() {

    // TODO: move to service
    const firstAndLastName = await this.storage.get('PERSONAL_DATA.firstAndLastName').toPromise();
    const travelLocation = await this.storage.get('PERSONAL_DATA.travelLocation').toPromise();
    const travelReturnDate = await this.storage.get('PERSONAL_DATA.travelReturnDate').toPromise();

    this.headerData = {
      firstAndLastName: firstAndLastName?.toString(),
      travelLocation: travelLocation?.toString(),
      travelReturnDate: travelReturnDate?.toString(),

      dateTimeNow: this.dateTimeNow()
    };

    // console.log(this.personalData, 'this.personalData');
  }

  /**
   * Fetch recorded results
   */
  private async initResults() {
    this.results = await this.questionsService.getAnswers();
    this.cautionLevel = await this.questionsService.getCurrentCautionLevel();

    //  Scroll to top to have nice rendering without strange top margin
    window.scrollTo(0, 0);

    // Wait 2 seconds until the whole HTML is rendered
    setTimeout(() => {
      // tslint:disable-next-line: max-line-length
      const filename = `eTrijaza - Anamnestički obrazac COVID-19 - ${this.headerData.firstAndLastName} - ${this.headerData.dateTimeNow}.png`;
      this.screenshotService.download('.result-summary-page-wrapper', filename);
    }, 2000);
  }

}
