import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
import { CartPage } from '../cart/cart';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
  }
  onSelected(article: Article): void {
    this.selectedArticle = article;
    console.log(article);
  }
  openCart(){
let modal = this.modalCtrl.create(CartPage);
modal.present();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BornePage');
  }

}
