import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/content/services/questions.service';
import { StorageMap } from '@ngx-pwa/local-storage';

@Component({
  selector: 'app-result-save-page',
  templateUrl: './result-save-page.component.html',
  styleUrls: ['./result-save-page.component.scss']
})
export class ResultSavePageComponent implements OnInit {

  lang: 'hr' | 'en';

  model: {
    firstAndLastName?: string,
    travelLocation?: string,
    travelReturnDate?: string
  } = {
    firstAndLastName: '',
    travelLocation: '',
    travelReturnDate: ''
  };

  isVisibleTravelData: boolean;

  constructor(
    private appBarService: AppBarService,
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService,
    private storage: StorageMap
  ) {}

  ngOnInit(): void {

    this.setTravelDataVisibility();

    this.lang = this.route.snapshot.data.lang ? this.route.snapshot.data.lang : 'hr';

    // TODO: translate
    this.appBarService.Title = 'KRAJ / ' + environment.app.bar.title.hr;

    this.fetchModelData();
  }

  /**
   * Listen for the model changes
   */
  public onModelChange(propertyId) {
    this.storage.set('PERSONAL_DATA.' + propertyId, this.model[propertyId]).subscribe();
  }

  /**
   * Call erase data at Questions service and redirect to home page
   */
  erase() {
    // TODO: translate
    const confirm = window.confirm('Jeste li sigurni da želite obrisati prikupljene podatke te otići na početnu stranicu?');

    if (confirm) {
      this.questionsService.clear();
      window.alert('Prikupljeni podaci cu uspješno i trajno obrisani.');
      this.router.navigate(['/']);
    }
  }

  /**
   * Travel data input is optional if person was not traveling in last 14 days (depends on answered question(s))
   */
  private async setTravelDataVisibility() {
    // TODO: check traveling answer(s)
    this.isVisibleTravelData = await this.questionsService.isLocationInputRequired;
  }

  /**
   * Check for model data in store
   */
  private async fetchModelData() {
    // console.log('fetchModelData', Object.keys(this.model));

    for (const propertyId of Object.keys(this.model)) {
      const data = await this.storage.get('PERSONAL_DATA.' + propertyId).toPromise();
      // console.log(data);
      if (data) {
        this.model[propertyId] = data;
      }
    }
  }

}
