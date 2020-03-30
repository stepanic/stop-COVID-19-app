import { Component, OnInit } from '@angular/core';
import { AppBarService } from 'src/app/blocks/app-bar/service/app-bar.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/content/services/questions.service';

@Component({
  selector: 'app-result-save-page',
  templateUrl: './result-save-page.component.html',
  styleUrls: ['./result-save-page.component.scss']
})
export class ResultSavePageComponent implements OnInit {

  lang: 'hr' | 'en';

  isVisibleTravelData: boolean;

  constructor(
    private appBarService: AppBarService,
    private route: ActivatedRoute,
    private router: Router,
    private questionsService: QuestionsService
  ) { }

  ngOnInit(): void {

    // TODO: check traveling answer(s)
    // this.isVisibleTravelData = true;

    this.lang = this.route.snapshot.data.lang ? this.route.snapshot.data.lang : 'hr';

    // TODO: translate
    this.appBarService.Title = 'KRAJ / ' + environment.app.bar.title.hr;
  }

  /**
   * Call erase data at Questions service and redirect to home page
   */
  erase() {
    // TODO: translate
    const confirm = window.confirm('Jeste li sigurni da želite obrisati prikupljene podatke te otići na početnu stranicu?');

    if (confirm) {
      this.questionsService.erase();
      window.alert('Prikupljeni podaci cu uspješno i trajno obrisani.');
      this.router.navigate(['/']);
    }
  }

}
