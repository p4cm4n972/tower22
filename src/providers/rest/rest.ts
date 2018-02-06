import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
private uri = 'http://localhost:9010/ws/heartbeat';
private httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  })
};
  constructor(public http: HttpClient) {
    console.log('RestProvider Provider');
  }

  initialisation() {
    return this.http.get(this.uri)
  }
}

