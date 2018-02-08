import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  cart: any[] = [];

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
  checkOut(total) {
    console.log(total);
    return this.http.post('http://localhost:9010/ws/paiement', { "TransactionNumber": "44545646565", "AmountToPay": total }).subscribe(data => {
      console.log(data);
    })
  }
}

