import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CartProvider } from '../../providers/cart/cart';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

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
  cartItems = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cart: CartProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }
  closeCart(): void {
    this.viewCtrl.dismiss();
  }
  proceedToCheckout(total) {
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
        
            this.cart.checkOut(total);
          }
        }
      ]
    });
    confirme.present();

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.cartItems = this.cart.get()

  }

}
