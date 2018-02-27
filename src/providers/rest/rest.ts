import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Socket } from '../../app/ws';


/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  private socket: Socket;
  observer: Observer<string>;

  getStatus() : Observable<string> {
    console.log('GET')
    this.socket = socketIo('http://10.1.1.111:5000');
    this.socket.on('clientdata', (res)=>{
    this.observer.next(res.data)
});
    this.socket.on('receipt', (res)=>{
    this.observer.next(res.data)
});
return this.createObservable();
}
createObservable() : Observable<string> {
  return new Observable<string>(observer => {
    this.observer = observer;
  });
}
private handleError(error) {
  console.error('server error:', error);
  if (error.error instanceof Error) {
      let errMessage = error.error.message;
      return Observable.throw(errMessage);
  }
  return Observable.throw(error || 'Socket.io server error');
}




  constructor(public http: HttpClient) {
    console.log('RestProvider Provider');
    
  }

  }

