import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SharedModule } from '../shared.module';
import { MainBannerComponent } from './main-banner/main-banner.component';



@NgModule({
  declarations: [
    AppBarComponent,
    AppShellComponent,
    MainBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AppShellComponent,
    MainBannerComponent
  ]
})
export class BlocksModule { }
