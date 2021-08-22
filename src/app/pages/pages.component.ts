import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {NbAuthService} from "@nebular/auth";

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

  // data$: Observable<any> = of({});
  data: any;
  _token: string = '5R7ul7KznhYtyAA6illDaRhYwux7oJ';
  users$: Observable<any[]> = of([]);

  constructor(private httpClient: HttpClient,
              /*private authService: NbAuthService*/) {
    /*this.authService.getToken().toPromise().then((r: any) => {
      this._token = r.token.access_token;
    })*/
  }

  ngOnInit(): void {
    this._token = this.getTokenValue();
    console.log('GETING TOKEN', this._token)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      })
    };
    // this.data$ = this.httpClient.get('http//localhost:8000/api/');
    this.httpClient.get('http://localhost:8000/secret', httpOptions).subscribe(r => {

      console.log(r)

    });


    this.users$ = this.httpClient.get<any[]>('http://localhost:8000/users', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this._token}`
      })
    })
  }

  getTokenValue(): any {
    const disk: any = localStorage.getItem("auth_app_token");
    if(disk) {

      return JSON.parse(JSON.parse(disk)['value'])['access_token']
    }else {
      return '';
    }
  }

}
