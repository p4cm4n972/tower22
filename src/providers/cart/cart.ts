import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import * as socketIo from 'socket.io-client';

import { Socket } from '../../app/ws';

declare var io : {
  connect(url: string): Socket;
};
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
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  add(article) {
    this.cart.push(article);
    
    localStorage.cart = JSON.stringify(this.cart);
    return article;
  }
  get() {
    console.log(this.cart);
    return this.cart;
  }

  
  
  
}

