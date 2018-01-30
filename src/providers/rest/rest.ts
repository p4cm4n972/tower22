import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
//private uri = 'http://10.1.1.77:9010/ws/supervision'
  constructor(public http: HttpClient) {
    console.log('RestProvider Provider');
  }

  initialisation() {
    return this.http.get('http://localhost:8080/api/tables')
  }
}

