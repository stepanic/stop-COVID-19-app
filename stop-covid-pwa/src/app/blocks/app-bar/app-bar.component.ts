import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppBarService } from './service/app-bar.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit, OnDestroy {

  // Input has the most priority, it overrides value from observer
  // Priority #1
  @Input() title: string;

  private title$: Subscription;

  constructor(
    private appBarService: AppBarService
  ) {
    // console.log('AppBarComponent.constructor', this.title);

    // Priority #2
    this.title$ = this.appBarService.Title$.subscribe(title => {
      // console.log('AppBarComponent.Title', title);
      this.title = title;
    });
  }

  ngOnDestroy(): void {
    this.title$.unsubscribe();
  }

  ngOnInit(): void {

    // console.log('AppBarComponent.ngOnInit', this.title);

    // Priority #3
    if (!this.title) {
      this.title = environment.app?.bar.title.hr || 'eTrijaza';
    }
  }

}
