import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BlocksModule } from './blocks/blocks.module';

const components = [];

const directives = [];

const modules = [
  CommonModule,

  MatToolbarModule,
  MatIconModule
];

@NgModule({
  declarations: [...components, ...directives],
  imports: [...modules],
  exports: [...components, ...directives, ...modules]
})
export class SharedModule { }
