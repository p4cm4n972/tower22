import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../pages/borne/article';

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
    this.cart.map(data => {
      console.log(data);
    });
    localStorage.cart = JSON.stringify(this.cart);
    return article;
  }
  get() {
    console.log(this.cart);
    return this.cart;
  }
  checkOut() {
    return this.http.post('http://localhost:9010/ws/paiement', { "TransactionNumber": "44545646565", "Montant": "36.00" }).subscribe(data => {
      console.log(data);
    })
  }
}

