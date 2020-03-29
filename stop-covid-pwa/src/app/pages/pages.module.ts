import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { TermsPageComponent } from './terms-page/terms-page.component';
import { PagesRoutingModule } from './pages-routing.module';
import { LayoutsModule } from '../layouts/layouts.module';
import { SharedModule } from '../shared.module';
import { QuestionsPageComponent } from './questions-page/questions-page.component';
import { BlocksModule } from '../blocks/blocks.module';



@NgModule({
  declarations: [HomePageComponent, TermsPageComponent, QuestionsPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    BlocksModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
