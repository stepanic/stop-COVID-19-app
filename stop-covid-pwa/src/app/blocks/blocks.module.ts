import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    AppBarComponent,
    AppShellComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AppShellComponent
  ]
})
export class BlocksModule { }
