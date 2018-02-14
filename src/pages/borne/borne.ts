import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
import { CartProvider } from '../../providers/cart/cart';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription } from 'rxjs/Subscription';
import { HomePage } from '../home/home';
import { OutOfServicePage } from '../out-of-service/out-of-service';
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
  data;
  sub: Subscription;
  



  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartPvd: CartProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, public rest: RestProvider) {
  }

  add(article: Article): void {
    this.selectedArticle = article;
    this.inChart = false;
    if (article.name === 'GROUPE') {
      article.qty = article.qty + 5;
      this.cart = this.cart + 5;
      this.total = this.total + (article.price * 5);
    } else {

      article.qty++;
      this.cart++;
      this.total = this.total + article.price;
    }

    this.pay = false;
  }
  remove(article: Article): void {
    this.selectedArticle = article;
    if (article.qty > 0) {
      if (article.name === 'GROUPE') {
        article.qty = article.qty - 5;
        this.cart = this.cart - 5;
        this.total = this.total - (article.price * 5);
      } else {

        article.qty--;
        this.cart--;
        this.total = this.total - article.price;
      }
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
            handler: (total) => {
    console.log(this.total);
              
              let toast = this.toastCtrl.create({
                message: 'Veuillez suivre les instructions sur le terminal de paiement',
                position: 'middle'
              });
              toast.present();
              let transaction = Math.floor((Math.random()* 99999999999) + 1);
              let invoice = { transaction, total:this.total}
              this.cartPvd.checkOut(invoice);
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
  status(data) {
    if(data === 'inService'){
   this.navCtrl.push(HomePage);
   let modal = this.modalCtrl.create(BornePage,{},{enableBackdropDismiss:false})
             modal.present();
 } else {
   this.navCtrl.push(OutOfServicePage)
 }
    
  }
  
  ionViewDidLoad() {
    this.sub = this.rest.getStatus()
    .subscribe(data => {
      this.data = data;
      console.log(data);
      this.status(data);
      
    })
  }

}
