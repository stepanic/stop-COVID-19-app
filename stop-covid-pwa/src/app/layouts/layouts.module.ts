import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { BlocksModule } from '../blocks/blocks.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    CommonModule,
    // SharedModule,
    BlocksModule,
    RouterModule
  ]
})
export class LayoutsModule { }
