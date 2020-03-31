import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { TermsPageComponent } from './terms-page/terms-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { QuestionsPageComponent } from './questions-page/questions-page.component';
import { ExplanationPageComponent } from './explanation-page/explanation-page.component';
import { LeafLayoutComponent } from '../layouts/leaf-layout/leaf-layout.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { IntroComponent } from '../content/intro/intro.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { ResultSavePageComponent } from './result-save-page/result-save-page.component';
import { ResultSummaryPageComponent } from './result-summary-page/result-summary-page.component';

const OR = (url: UrlSegment[], paths: string[], level = 0): UrlMatchResult => {

  // console.log('OR.UrlSegment[]', url);

  // BAD IDEA, do not use it
  // Access to #/terms, it is required for ngx-translate
  // let hash = window.location.hash;
  // console.log(hash);
  // if (hash) {
  //   hash = hash.replace('#', '').replace('/', '');
  //   if (paths.includes(hash)) {
  //     window.location.hash = '';
  //     return {
  //       consumed: url
  //     };
  //   }
  // }

  // console.log('matcher.OR', url);

  // Classic Angular Router handling
  if (!url || !url.length) {
    return null;
  }

  const path = url[level].path;
  if (paths.includes(path)) {
    // After introduced level this makes conflicts
    // if (url.length > 1) {
    //   return null; // exclude starts with, accept only exact match
    // }
    return {
      consumed: url
    };
  }
  return null;
};

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        matcher: (url: UrlSegment[]): UrlMatchResult => {
          return OR(url, ['terms', 'uvjeti']);
        },
        component: TermsPageComponent,
        data: {
          title: {
            hr: 'Uvjeti',
            en: 'Terms'
          }
        }
      },
      {
        path: 'pitanje/:questionId', // HR
        component: QuestionsPageComponent
      },
      {
        path: 'question/:questionId', // EN
        component: QuestionsPageComponent
      },
      {
        path: 'rezultati/oprez/:cautionId', // HR
        component: ResultPageComponent,
        data: {
          lang: 'hr'
        }
      },
      {
        path: 'results/caution/:cautionId', // EN
        component: ResultPageComponent,
        data: {
          lang: 'en'
        }
      },
      {
        path: 'rezultati/spremanje', // HR
        component: ResultSavePageComponent,
        data: {
          lang: 'hr'
        }
      },
      {
        path: 'results/export', // HR
        component: ResultSavePageComponent,
        data: {
          lang: 'en'
        }
      },
      
      {
        path: '',
        component: HomePageComponent
      }
    ]
  },
  {
    path: '',
    component: LeafLayoutComponent,
    children: [
      // {
      //   path: '',
      //   component: AboutPageComponent,
      //   children: [
      //     {
      //       path: 'uvod',
      //       component: IntroComponent
      //     }
      //   ]
      // },
      {
        matcher: (url: UrlSegment[]): UrlMatchResult => {
          return OR(url, [
            'intro',
            'uvod',

            'about-authors',
            'o-autorima',

            'about-app',
            'o-aplikaciji',

            'general-hygiene-measures',
            'opce-higijenske-mjere',

            'osnovno-COVID-19',
            'about-COVID-19',

            'simptomi-COVID-19',
            'about-COVID-19-symptoms'
          ]);
        },
        component: AboutPageComponent
      },
      {
        path: 'pojasnjenje',

        // TODO: improve matcher
        // matcher: (url: UrlSegment[]): UrlMatchResult => {
        //   return OR(url, ['pojasnjenje', 'explanation']);
        // },
        component: ExplanationPageComponent,
        children: [
          {
            path: 'zimica-tresavica-bol-u-misicima-iznemoglost',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.CHILLS_SHAKING_PAIN-IN-MUSCLES_EXHAUSTION' }
          },
          {
            path: 'bliski-kontakt',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.CLOSE-CONTACT' }
          },
          {
            path: 'zajednica',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.COMMUNITY' }
          },
          {
            path: 'disne-tegobe',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.RESPIRATORY-PROBLEMS' }
          },
          {
            path: 'kronicne-bolesti',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.CHRONIC-DISEASES' }
          },
          {
            path: 'samoizolacija',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.SELF-ISOLATION' }
          }
        ]
      },
      {
        path: 'upozorenje',
        component: ExplanationPageComponent,
        children: [
          {
            path: '',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.WARNING' }
          }
        ]
      },
      {
        path: 'explanation',
        component: ExplanationPageComponent,
        children: [
          {
            path: 'shaking-chills-pain-in-muscles-exhaustion',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.CHILLS_SHAKING_PAIN-IN-MUSCLES_EXHAUSTION' }
          },
          {
            path: 'close-contact',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.CLOSE-CONTACT' }
          },
          {
            path: 'community',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.COMMUNITY' }
          },
          {
            path: 'respiratory-problems',
            component: ExplanationPageComponent,
            data: { tid: 'EXPLANATION.RESPIRATORY-PROBLEMS' }
          }
        ]
      },
      {
        path: 'rezultati/preuzimanje', // HR
        component: ResultSummaryPageComponent,
        data: {
          lang: 'hr'
        }
      },
      {
        path: 'results/download', // EN
        component: ResultSummaryPageComponent,
        data: {
          lang: 'en'
        }
      },
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesRoutingModule { }
