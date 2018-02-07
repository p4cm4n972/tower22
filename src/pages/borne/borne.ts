import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
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
  cartE = [];
  total: number = 0;
  cart: number = 0;
  pay: boolean = true;




  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartPvd: CartProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  add(article: Article): void {
    this.selectedArticle = article;
    this.inChart = false;
    article.qty++;
    this.cart++;
    this.total = this.total + article.price;
    this.pay = false;
  }
  remove(article: Article): void {
    this.selectedArticle = article;
    if (article.qty > 0) {
      article.qty--;
      this.cart--;
      this.total = this.total - article.price;
    }
    console.log(this.cart);


  }

  checkOut(total) {
    if (total > 0) {
      let confirme = this.alertCtrl.create({
        title: 'Proceed payment',
        buttons: [
          {
            text: 'Disagree',
            handler: () => {
              console.log('proceed payment avort');
            }
          },
          {
            text: 'Agree',
            handler: () => {
              let toast = this.toastCtrl.create({
                message: 'Veuillez suivre les instructions sur le terminal de paiement',
                position: 'middle'
              });
              toast.present();

              this.cartPvd.checkOut();
            }
          }
        ]
      });
      confirme.present();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Votre panier est vide',
        position: 'middle',
        duration: 2000
      });
      toast.present();

    }


  }
  ionViewDidLoad() {
  }

}
