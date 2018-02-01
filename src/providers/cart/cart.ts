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
  adulte = [];
  enfant = [];
  groupe = [];

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  add(article) {
    console.log(article.name);
    switch(article.name) {
      case 'ADULTE':
      this.adulte.push({article});
      break;
      case 'ENFANT':
      this.enfant.push({article});
      break;

      case 'GROUPE':
      this.groupe.push({article});
      break;
      
    }
    console.log(this.cart)
    return article;
  }
  get(){
    this.cart.push([
    {adulte: this.adulte},
    {enfant: this.enfant},
    {groupe: this.groupe}]
    )
    console.log(this.cart.length);
    return (this.adulte, this.enfant, this.groupe);
  }
}
