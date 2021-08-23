import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private httpClient: HttpClient) {
  }

  getUsers$() {
    return this.httpClient.get<any[]>('http://localhost:8000/users')
  }

}
