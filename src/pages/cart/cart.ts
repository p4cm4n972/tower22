import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CartProvider } from '../../providers/cart/cart';
<<<<<<< HEAD
import { Items } from './items';
=======
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BornePage } from '../borne/borne';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
>>>>>>> da2eb2f8

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
<<<<<<< HEAD
private cartItems: Items[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cart: CartProvider) {
=======
  cartItems = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cart: CartProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
>>>>>>> da2eb2f8
  }
  closeCart(): void {
    this.viewCtrl.dismiss();
  }
  proceedToCheckout() {
    let confirme = this.alertCtrl.create({
      title: 'Proceed payment',
      buttons: [
        {
          text: 'Disagree',
          handler:() => {
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
        
            this.cart.checkOut();
          }
        }
      ]
    });
    confirme.present();

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
<<<<<<< HEAD
    this.cartItems = this.cart.get();
    console.log(this.cartItems);
    
=======
    this.cartItems = this.cart.get()

>>>>>>> da2eb2f8
  }

}
