import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-explanation-page',
  templateUrl: './explanation-page.component.html',
  styleUrls: ['./explanation-page.component.scss']
})
export class ExplanationPageComponent implements OnInit, OnDestroy {

  public title: string;
  public body: any;

  private tid: string;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {


  }

  ngOnInit(): void {
    this.tid = this.route.firstChild?.snapshot.data?.tid;
    this.fetchTranslation();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Fetch explanations's translation
   */
  private fetchTranslation() {

    this.subscription.add(this.translate.stream(this.tid).subscribe((translation: any) => {
      this.title = translation.HEAD.TITLE.text;
      this.body = Object.values(translation.BODY);
    }));
  }

}
