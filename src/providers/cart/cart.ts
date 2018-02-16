import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import * as socketIo from 'socket.io-client';

import { Socket } from '../../app/ws';


/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  cart: any[] = [];
  private socket: Socket;

  checkOut(invoice) {
    console.log(invoice);
    this.socket = socketIo('http://localhost:5000');
    this.socket.emit('invoice',invoice);
    return this.http.post('http://10.1.1.77:9010/ws/paiement', invoice);
  }
  
  
  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  
 

  
  
  
}

