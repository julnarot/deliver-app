import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private httpClient: HttpClient) {
  }

  getUsers$() {
    return this.httpClient.get<any[]>('http://localhost:8000/users')
  }

  getOrders$() {
    return this.httpClient.get<any>('http://localhost:5000/orders').pipe(map((m: any) => m.data))
  }

  addOrder$(body: any) {
    return this.httpClient.post<any>('http://localhost:5000/order', body).pipe(map((m: any) => m.data))
  }

}
