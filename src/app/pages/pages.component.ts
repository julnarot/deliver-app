import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {MainService} from "../main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
        <h6>Pedidos</h6>
        <form [formGroup]="form" (ngSubmit)="addOrder()"><input type="text" formControlName="code">
          <button nbButton type="submit" [disabled]="form.invalid">Agregar</button>
        </form>
        <nb-user *ngFor="let user of orders "
                 [name]="user.code" [title]="user.email"
        ></nb-user>
      </nb-card-body>
      <nb-card-footer>

      </nb-card-footer>
    </nb-card>


  `,
  styles: []
})
export class PagesComponent implements OnInit {
  form: FormGroup
  users$: Observable<any[]> = of([]);
  orders: any[] = [];

  constructor(private service: MainService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      code: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.users$ = this.service.getUsers$();
    this.getOrders();
  }

  getOrders() {
    this.service.getOrders$().toPromise()
      .then(o => this.orders = o);
  }

  addOrder(): void {
    this.service.addOrder$({code: this.form.get('code')?.value})
      .toPromise()
      .then(r => {
        this.form.get('code')?.setValue('');
        this.getOrders();
      });
  }
}
