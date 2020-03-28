import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public translate: TranslateService) {

    this.setupTranslations();
  }

  private setupTranslations() {

    // this.translate.addLangs(['hr', 'en', 'de', 'fr']);
    this.translate.addLangs(['hr', 'en']);
    // this.translate.addLangs(['hr']); // it is not possible have only hr becasue en is default

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');
  }
}
