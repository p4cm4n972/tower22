import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { CartProvider } from '../../providers/cart/cart';
import { Items } from './items';

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
private cartItems: Items[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public cart: CartProvider) {
  }
  closeCart(): void {
    this.viewCtrl.dismiss();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.cartItems = this.cart.get();
    console.log(this.cartItems);
    
  }

}
