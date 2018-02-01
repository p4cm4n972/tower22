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
   adulte =  0;
   enfant = 0 ;
   groupe = 0 ;

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  add(article) {
    switch (article.name) {
      case 'ADULTE':
        ++this.adulte;
        break;
      case 'ENFANT':
        ++this.enfant;
        break;

      case 'GROUPE':
        ++this.groupe;
        break;

    }
    return article;
  }
  get() {
    this.cart.push({
      adulte : this.adulte,
      enfant: this.enfant,
      groupe: this.groupe
    })
    return (this.cart);
  }
}
