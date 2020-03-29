import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SharedModule } from '../shared.module';
import { MainBannerComponent } from './main-banner/main-banner.component';
import { AppBarLeafComponent } from './app-bar-leaf/app-bar-leaf.component';



@NgModule({
  declarations: [
    AppBarComponent,
    AppShellComponent,
    MainBannerComponent,
    AppBarLeafComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AppShellComponent,
    MainBannerComponent,
    AppBarLeafComponent
  ]
})
export class BlocksModule { }
