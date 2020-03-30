import { Component } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private translate: TranslateService,
    private storage: StorageMap,
    private titleService: Title,
    private metaService: Meta,
    private router: Router
  ) {

    // On every navigate scroll to top!
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });

    this.setupTranslations();
  }

  private setupTranslations() {

    // this.translate.addLangs(['hr', 'en', 'de', 'fr']);
    if (environment.multiLanguage.enabled) {
      this.translate.addLangs(['hr', 'en']);
    } else {
      this.translate.addLangs(['hr']);
    }
    // this.translate.addLangs(['hr']); // it is not possible have only hr becasue en is default

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang(environment.multiLanguage.enabled ? 'en' : 'hr');

    // If already set in localStorage use this value
    this.storage.get('lang').pipe(take(1)).subscribe((lang: string) => {

      // Clear unsupported languages
      if (!this.translate.getLangs().includes(lang)) {
        lang = null;
      }
      if (!lang) {
        // Use default lang
        lang = 'hr'; // TODO: put to `en` when translation will be available
      }
      // the lang to use, if the lang isn't available, it will use the current loader to get them
      this.translate.use(lang);

    });

    // Store current lang to localStorage on every lang change
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.storage.set('lang', event.lang).pipe(take(1)).subscribe();

      // TODO: move to some other place
      // Set title from translation
      this.titleService.setTitle(event.translations.APP.TITLE.text);
      this.metaService.updateTag({
        name: 'description',
        content: event.translations.APP.DESCRIPTION.text
      });
    });

  }
}
