import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  
  private subscription: Subscription = new Subscription();

  public param = { value: 'svijet' };

  constructor(
    private appBarService: AppBarService,
    public translate: TranslateService
  ) {
    this.appBarService.Title = 'Ovo je hoem title2';

    

    console.log(this.translate.currentLang);

    this.fetchTranslations();

  }
  

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private fetchTranslations() {
    this.subscription.add(
      this.translate.stream('APP.TITLE.text').subscribe(appTitle => {
        console.log(appTitle);
        this.appBarService.Title = appTitle;

      })
    );
  }

}
