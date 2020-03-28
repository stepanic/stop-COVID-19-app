import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, UrlSegment, UrlMatchResult } from '@angular/router';
import { TermsPageComponent } from './terms-page/terms-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';

const OR = (url: UrlSegment[], paths: string[]): UrlMatchResult => {
  if (!url || !url.length) {
    return null;
  }

  const path = url[0].path;
  if (paths.includes(path)) {
    if (url.length > 1) {
      return null; // exclude starts with, accept only exact match
    }
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
            hr: 'Uvjeti naslov',
            en: 'Terms title'
          }
        }
      },
      {
        path: '**',
        component: HomePageComponent
      }
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
