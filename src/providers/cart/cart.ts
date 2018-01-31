import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CartProvider {
  cart = [];

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  add(article) {
    console.log(article.name);
    this.cart.push({items : article})
    console.log(this.cart)
    return article;
  }
  get(){
    console.log(this.cart);
    return this.cart;
  }
}
