import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppBarService } from './service/app-bar.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MediaMatcher, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit, OnDestroy {

  // Input has the most priority, it overrides value from observer
  // Priority #1 - form component attribute
  @Input() title: string;
  private title$: Subscription;

  public queryXSmall: MediaQueryList;

  constructor(
    private appBarService: AppBarService,
    public translate: TranslateService,
    private media: MediaMatcher
  ) {
    // console.log('AppBarComponent.constructor', this.title);

    console.log(Breakpoints.XSmall);

    this.queryXSmall = this.media.matchMedia(Breakpoints.XSmall);

    // Priority #2 - from appBarService
    this.title$ = this.appBarService.Title$.subscribe(title => {
      console.log('AppBarComponent.Title', title);
      this.title = title;
    });
  }

  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  ngOnInit(): void {

    // console.log('AppBarComponent.ngOnInit', this.title);

    // Priority #3 - from environemnt
    if (!this.title) {
      this.title = environment.app?.bar.title.hr || 'eTrijaza';
    }
  }

}
