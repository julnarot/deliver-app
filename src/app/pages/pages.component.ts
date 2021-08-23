import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {MainService} from "../main.service";

@Component({
  selector: 'app-pages',
  template: `
    <nb-card>
      <nb-card-body>
        <nb-user *ngFor="let user of users$|async "
                 [name]="user.username" [title]="user.email"
                 badgeText="2"
                 badgeStatus="success"
                 badgePosition="bottom right"
        ></nb-user>
      </nb-card-body>
    </nb-card>


  `,
  styles: []
})
export class PagesComponent implements OnInit {
  users$: Observable<any[]> = of([]);

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.users$ = this.service.getUsers$();
  }

}
