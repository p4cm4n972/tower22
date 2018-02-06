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
  cartE= [];
  total: number= 0;
  cart: number= 0;
  

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartPvd: CartProvider) {
    
  }
  add(article: Article): void {
    this.selectedArticle = article;
    this.inChart = false;
    article.qty++;
    this.cart++;
    this.total = this.total + article.price;
  }
  remove(article: Article): void {
    this.selectedArticle = article;
    article.qty--;
    this.cart--;
    this.total = this.total - article.price;
    
  }
  
  checkOut(total) {
    console.log(total);
    this.cartPvd.checkOut();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BornePage');
    }

}
