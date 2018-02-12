import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
private uri = 'http://localhost:9010/ws/heartbeat';

  constructor(public http: HttpClient) {
    console.log('RestProvider Provider');
  }

  initialisation() {
    return this.http.get(this.uri)
  }

  heartBeat():Observable<any> {
    return this.http.get('http://localhost:9010/api/OutOfServicePage')
  }
}

