import { Component, OnInit } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private appBarService: AppBarService) {
    this.appBarService.Title = 'Ovo je hoem title2';

  }

  ngOnInit(): void {

  }

}
