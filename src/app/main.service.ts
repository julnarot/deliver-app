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

  getOrders$(params: any) {
    return this.httpClient.get<any>('http://localhost:5000/orders',{params})
      .pipe(map((m: any) => m.data))
  }

  addOrder$(body: any) {
    return this.httpClient.post<any>('http://localhost:5000/orders', body)
      .pipe(map((m: any) => m.data))
  }

  updateOrder$(code: string, body: any) {
    return this.httpClient.put<any>('http://localhost:5000/order/' + code, body)
      .pipe(map((m: any) => m.data))
  }

  deleteOrder(code: any) {
    return this.httpClient.delete<any>('http://localhost:5000/order/' + code)
      // .pipe(map((m: any) => m.data))
  }

}
