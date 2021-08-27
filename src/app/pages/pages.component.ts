import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {MainService} from "../main.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NbToastrService} from "@nebular/theme";

@Component({
  selector: 'app-pages',
  template: `
    <nb-card>
      <nb-card-body>
        <!--<nb-user *ngFor="let user of users$|async "
                 [name]="user.username" [title]="user.email"
                 badgeText="2"
                 badgeStatus="success"
                 badgePosition="bottom right"
        ></nb-user>-->

        <div class="row ">
          <div class="col-md-7 " [nbSpinner]="listLoader">
            <nb-card class="m-0" [size]="orders && orders.length > 5  ? 'small': ''">
              <nb-card-header class="d-flex justify-content-between">Pedidos
              <nb-icon icon="refresh-outline" (click)="getOrders()"></nb-icon></nb-card-header>
              <nb-card-body class="p-0">
                <nb-badge text="{{orders.length}}" status="info" *ngIf="orders.length > 0"></nb-badge>
                <nb-list *ngIf="orders && orders.length>0; else notFound">
                  <nb-list-item class="d-flex justify-content-between" *ngFor="let ord of orders ">
                    <nb-user [name]="ord.customer_name" [title]="ord.code"
                             (click)="form.patchValue(ord); code = ord.code" style="cursor: pointer"></nb-user>
                    <button nbButton status="danger" (click)="onDelete(ord.code)">
                      <nb-icon icon="trash-outline"></nb-icon>
                    </button>
                  </nb-list-item>
                </nb-list>
              </nb-card-body>
            </nb-card>

          </div>
          <div class="col-md-5">
            <form [formGroup]="form" (ngSubmit)="onAction()">
            <nb-card>
              <nb-card-header>Formulario</nb-card-header>
              <nb-card-body>

                  <input nbInput type="text" formControlName="customer_name" placeholder="Cliente" fullWidth
                         class="mb-2">
                  <input nbInput type="number" formControlName="cost" placeholder="Costo" fullWidth class="mb-2">


              </nb-card-body>
              <nb-card-footer><button nbButton type="submit" status="primary" [nbSpinner]="buttonSpinner" [disabled]="form.invalid"
                                      class="m-2" fullWidth>{{ !code ? 'Agregar' : 'Modificar'}}
              </button></nb-card-footer>
            </nb-card>
            </form>
          </div>
        </div>
      </nb-card-body>
      <nb-card-footer>

      </nb-card-footer>
    </nb-card>
    <ng-template #notFound>
      <nb-list>
        <nb-list-item class="d-flex justify-content-center text-muted"> No se encontraron datos relacionados
        </nb-list-item>
      </nb-list>
    </ng-template>

  `,
  styles: []
})
export class PagesComponent implements OnInit {
  form: FormGroup
  users$: Observable<any[]> = of([]);
  orders: any[] = [];
  buttonSpinner = false;
  listLoader = false;
  code = '';

  constructor(private service: MainService,
              private formBuilder: FormBuilder,
              private toastrService: NbToastrService) {
    this.form = this.formBuilder.group({
      customer_name: ['', Validators.required],
      cost: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.users$ = this.service.getUsers$();
    this.getOrders();
  }

  getOrders() {
    this.listLoader = true;
    this.service.getOrders$().toPromise()
      .then(o => {
        this.orders = o
        this.listLoader = false;
      }, err => {
        this.listLoader = false;
        const loq: any = Object.assign({}, {position: 'top-right', status: 'danger'})
        this.toastrService.show(
          `${err}`,
          'Error',
          loq);
      });
  }

  onAction() {
    if (!!this.code) {
      this.updateOrder();
    } else {
      this.addOrder();
    }
  }

  addOrder(): void {
    this.buttonSpinner = true;
    this.service.addOrder$(this.form.value)
      .toPromise()
      .then(r => {
        const loq: any = Object.assign({}, {position: 'top-right', status: 'success'})
        this.toastrService.show(
          `${this.form.get('customer_name')?.value}, Registrado!`,
          'Success',
          loq);
        this.form.reset();
        this.buttonSpinner = false
        this.getOrders();
      }, () => {
        const loq: any = Object.assign({}, {position: 'top-right', status: 'danger'})
        this.toastrService.show(
          `${this.form.get('customer_name')?.value}`,
          'Dont Complete',
          loq);
        this.buttonSpinner = false
      });
  }

  updateOrder(): void {
    this.buttonSpinner = true;
    this.service.updateOrder$(this.code, this.form.value)
      .toPromise()
      .then(r => {
        const loq: any = Object.assign({}, {position: 'top-right', status: 'success'})
        this.toastrService.show(
          `${this.form.get('customer_name')?.value}, Actualizado!`,
          'Success',
          loq);
        this.form.reset();
        this.code = '';
        this.buttonSpinner = false
        this.getOrders();
      }, () => {
        const loq: any = Object.assign({}, {position: 'top-right', status: 'danger'})
        this.toastrService.show(
          `${this.form.get('customer_name')?.value}`,
          'Dont Complete',
          loq);
        this.buttonSpinner = false
      });
  }

  onDelete(code: string): void {
    this.listLoader = true;
    this.service.deleteOrder(code).toPromise().then(() => {
      const loq: any = Object.assign({}, {position: 'top-right', status: 'info'})
      this.toastrService.show(
        `Pedido eliminado`,
        'Success',
        loq);
      this.getOrders();
      this.form.reset();
      this.code = '';
      this.listLoader = false
    }, ()=>this.listLoader = false)
  }
}
