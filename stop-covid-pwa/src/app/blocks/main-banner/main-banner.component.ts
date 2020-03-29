import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {

  @Input() mode: string;

  constructor() { }

  ngOnInit(): void {
  }

}
