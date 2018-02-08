import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
import { CartProvider } from '../../providers/cart/cart';
import { RestProvider } from '../../providers/rest/rest';
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
  response;
  cartItems = [];
  inChart: boolean = true;
  cartE = [];
  total: number = 0;
  cart: number = 0;
  pay: boolean = true;
  error;




  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartPvd: CartProvider, public toastCtrl: ToastController, public alertCtrl: AlertController, private rest: RestProvider, public loadingCtrl: LoadingController) {

  }
  oos() {
    console.log('OUT OF SERVICE !');
    let loaderOOS = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `
<div><h2><span>Sorry...</span><br>TEMPORARILY OUT OF SERVICE</h2></div>
`
    });
    loaderOOS.present();
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

              this.cartPvd.checkOut(this.total);
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

  heartbeat = () =>{}



  ionViewDidLoad() {
    setInterval(() => {
      this.rest.initialisation().subscribe(response => {
        this.response = response;
        console.log(response);
        if (this.response.ProductMode !== 'inService') {
          this.oos();
  
        }},
        error => {
          this.error = <any>error;
          console.log("http failure");
          this.oos();
        });
      },3000)
  }

}
