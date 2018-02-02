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
<<<<<<< HEAD
  cart = [];
   adulte =  0;
   enfant = 0 ;
   groupe = 0 ;
=======
  cart: any[] = [];
>>>>>>> da2eb2f8

  constructor(public http: HttpClient) {
    console.log('Hello CartProvider Provider');
  }
  add(article) {
<<<<<<< HEAD
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
=======
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
>>>>>>> da2eb2f8
  }
  checkOut() {
    return this.http.post('http://10.1.1.77:9010/ws/paiement', { "TransactionNumber": "44545646565", "Montant": "36.00" }).subscribe(data => {
      console.log(data);
    })
  }
}
