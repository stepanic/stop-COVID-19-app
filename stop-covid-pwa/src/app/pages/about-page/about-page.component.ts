import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-about-page',
  templateUrl: './about-page.component.html',
  styleUrls: ['./about-page.component.scss']
})
export class AboutPageComponent implements OnInit, OnDestroy {

  title: string;
  path: string;

  isVisibleMainBanner: boolean;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute
  ) {

    this.subscription.add(this.route.url.subscribe(url => {
      this.initPage();
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private initPage() {
    this.path = this.route.snapshot.url[0].path;

    this.isVisibleMainBanner = true;

    if (this.path === 'intro') {
      this.title = 'Intro /' + environment.app.bar.title.en;
      this.isVisibleMainBanner = false;
    }
    if (this.path === 'uvod') {
      this.title = 'Uvod / ' + environment.app.bar.title.hr;
      this.isVisibleMainBanner = false;
    }

    if (this.path === 'about-authors') {
      this.title = 'About authors';
    }
    if (this.path === 'o-autorima') {
      this.title = 'O autorima';
    }

    if (this.path === 'about-app') {
      this.title = 'About application';
    }
    if (this.path === 'o-aplikaciji') {
      this.title = 'O aplikaciji';
    }

    if (this.path === 'general-hygiene-measures') {
      this.title = 'General hygiene measures';
    }
    if (this.path === 'opce-higijenske-mjere') {
      this.title = 'Opće higijenske mjere';
    }

    if (this.path === 'about-COVID-19') {
      this.title = 'About COVID-19 disease';
    }
    if (this.path === 'osnovno-COVID-19') {
      this.title = 'Osnovno o COVID-19';
    }

    if (this.path === 'about-COVID-19-symptoms') {
      this.title = 'Symptoms / COVID-19';
    }
    if (this.path === 'simptomi-COVID-19') {
      this.title = 'Simptomi / COVID-19';
    }
  }

}
