import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
import { CartPage } from '../cart/cart';
import { CartProvider } from '../../providers/cart/cart';
/**
 * Generated class for the BornePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-borne',
  templateUrl: 'borne.html',
})
export class BornePage {
  articles = ARTICLES;
  selectedArticle: Article;
  response: Object
  cartItems = [];
  inChart: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cart: CartProvider) {
  }
  onSelected(article: Article): void {
    this.selectedArticle = article;
    this.cart.add(article);
<<<<<<< HEAD
=======
    this.inChart = false;
>>>>>>> da2eb2f8
  }
  openCart() {
    let modal = this.modalCtrl.create(CartPage);
    modal.present();
  }
  ionViewDidLoad() {
<<<<<<< HEAD
    console.log('BornePage');
=======
    console.log('ionViewDidLoad BornePage');
    this.cartItems = this.cart.get()

>>>>>>> da2eb2f8
  }

}
