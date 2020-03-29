import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-leaf-layout',
  templateUrl: './leaf-layout.component.html',
  styleUrls: ['./leaf-layout.component.scss']
})
export class LeafLayoutComponent implements OnInit {

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
  }

}
