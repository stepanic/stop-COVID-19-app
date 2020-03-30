import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ContentModule } from './content/content.module';

const components = [];

const directives = [];

const modules = [
  CommonModule,
  RouterModule,

  TranslateModule,

  ContentModule,

  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatListModule,
  MatCheckboxModule,
  MatInputModule
];

@NgModule({
  declarations: [...components, ...directives],
  imports: [...modules],
  exports: [...components, ...directives, ...modules]
})
export class SharedModule { }
