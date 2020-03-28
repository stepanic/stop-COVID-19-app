import { Component, OnInit } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms-page',
  templateUrl: './terms-page.component.html',
  styleUrls: ['./terms-page.component.scss']
})
export class TermsPageComponent implements OnInit {

  constructor(
    private appBarService: AppBarService,
    private route: ActivatedRoute
  ) {

    console.log('TermsPageComponent.constructor');
    // this.appBarService.Title = 'Uvjeti page constructor';
  }

  ngOnInit(): void {
    console.log('TermsPageComponent.ngOnInit');

    // this.appBarService.Title = 'Uvjeti page ngOnInit';

    const routeData = this.route.snapshot.data;
    console.log('AppBarComponent.ngOnInit.routeData', routeData);

    this.appBarService.Title = routeData.title.hr;
  }

}
