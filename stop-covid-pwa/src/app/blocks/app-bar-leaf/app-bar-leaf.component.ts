import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-leaf',
  templateUrl: './app-bar-leaf.component.html',
  styleUrls: ['./app-bar-leaf.component.scss']
})
export class AppBarLeafComponent implements OnInit {

  @Input() title: string;
  @Input() returnPath: string;

  constructor() {
    this.title = '[DEFAULT] title';
  }

  ngOnInit(): void {

    this.setupReturnPath();
  }

  public back() {
    window.history.back();
  }

  private setupReturnPath() {
    if (!this.returnPath) {
      this.returnPath = window.history.state.returnPath;
    }

    if (!this.returnPath) {
      this.returnPath = '/'; // Default return to home
    }
  }

}
