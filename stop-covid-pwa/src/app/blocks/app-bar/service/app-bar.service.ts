import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppBarService {

  // private title: string;
  private title$: Subject<string> = new Subject();

  constructor() {
    // console.log('AppBarService.constructor');
  }

  get Title$() {
    return this.title$;
  }

  set Title(title: string) {
    this.title$.next(title);
  }
}
