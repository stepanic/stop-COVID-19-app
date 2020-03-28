import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { PagesModule } from './pages/pages.module';

const modules = [
  CommonModule,
  // SharedModule,
  PagesModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  // exports: [...modules]
})
export class UiModule { }
