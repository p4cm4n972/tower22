import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { ARTICLES } from '../borne/mock-articles';
import { Article } from '../borne/article';
import { CartProvider } from '../../providers/cart/cart';
import { RestProvider } from '../../providers/rest/rest';
import { Subscription } from 'rxjs/Subscription';
import { BornePage } from '../borne/borne';
import { OutOfServicePage } from '../out-of-service/out-of-service';
import { Validators, FormBuilder } from '@angular/forms';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  articles = ARTICLES;
  selectedArticle: Article;
  response: Object
  cartItems = [];
  inChart: boolean = true;
  cartE = [];
  total: number = 0;
  pay: boolean = true;
  data;
  sub: Subscription;
  article;
  optionQty: {title: string, cssClass: string};
  optionTicket: {title: string, cssClass: string};
  public item;
  cart: number = 0;
  invoice;
  toast;

  constructor( public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public cartPvd: CartProvider, private formBuilder: FormBuilder, public toastCtrl: ToastController, public alertCtrl: AlertController, public rest: RestProvider) {
  this.optionQty = {
    title: 'Quantité',
    cssClass: 'opacity:.5'
    
  }
  this.optionTicket = {
    title: 'Tickets',
    cssClass: ''
    
  }
  this.item = this.formBuilder.group({
    article: ['', Validators.required],
    qty: ['', Validators.required],
})
  }
  
  add(articleS): void {
    console.log(articleS);
    switch(articleS.article) {
      case "ADULTE":
     this.articles[0].qty += +articleS.qty;
     this.cart += +articleS.qty;
     this.total = this.total + ((+this.articles[0].qty) * 10);
     break;
     case "ENFANT":
     this.articles[1].qty += + articleS.qty
     this.cart += +articleS.qty;
     this.total = this.total + ((+this.articles[1].qty) * 7);
     break;
     case "GROUPE":
     this.articles[2].qty += + articleS.qty
     this.cart += +articleS.qty;
     this.total = this.total + ((+this.articles[2].qty) * 5);
     break;
    }
    
  this.inChart = false;
    //this.cart = this.cart + +articleS.qty;
    this.item.reset();
    
  }
  remove(items): void {
    console.log(items)
    
    
    switch(items.name) {
      case "ADULTE":
      this.cart = this.cart- items.qty;
     this.total = this.total - ((+this.articles[0].qty) * 10);
      this.articles[0].qty = 0;
     break;
     case "ENFANT":
     this.cart = this.cart- items.qty;
     this.total = this.total - ((+this.articles[1].qty) * 7);
     
     this.articles[1].qty = 0;
     break;
     case "GROUPE":
     this.cart = this.cart- items.qty;
     this.total = this.total - ((+this.articles[2].qty) * 5);
     this.articles[2].qty = 0;
     break;
    }
  }
  less(items) {
    switch(items.name) {
      case "ADULTE":
      this.cart = this.cart- 1;
     this.total = this.total -  10;
      this.articles[0].qty = this.articles[0].qty - 1;
     break;
     case "ENFANT":
     this.cart = this.cart- 1;
     this.total = this.total -  7;
      this.articles[1].qty = this.articles[1].qty - 1;
     break;
     case "GROUPE":
     this.cart = this.cart- 1;
     this.total = this.total -  5;
      this.articles[2].qty = this.articles[2].qty - 1;
     break;
    }
  }
  more(items) {
    switch(items.name) {
      case "ADULTE":
      this.cart = this.cart + 1;
     this.total = this.total +  10;
      this.articles[0].qty = this.articles[0].qty + 1;
     break;
     case "ENFANT":
     this.cart = this.cart + 1;
     this.total = this.total +  7;
      this.articles[1].qty = this.articles[1].qty + 1;
     break;
     case "GROUPE":
     this.cart = this.cart + 1;
     this.total = this.total + 5;
      this.articles[2].qty = this.articles[2].qty + 1;
     break;
    }
  }

  checkOut(total) {
      let confirme = this.alertCtrl.create({
        title: 'Payer : ' + this.total + '€',
        buttons: [
          {
            text: 'Annuler',
            handler: () => {
              console.log('proceed payment avort');
            }
          },
          {
            text: 'Valider',
            handler: (total) => {
    console.log(this.total);
              
              const toast = this.toastCtrl.create({
                message: 'Veuillez suivre les instructions sur le terminal de paiement...',
                position: 'middle',
                duration: 10000
              });
              toast.present();
              let transaction = Math.floor((Math.random()* 99999999999) + 1);
             this.invoice = { transaction, total:this.total}
              this.cartPvd.checkOut(this.invoice);
            }
          }
        ]
      });
      confirme.present();


  }
  status(data) {
    if(data === 'inService'){
   this.navCtrl.push(HomePage);
   let modal = this.modalCtrl.create(HomePage,{},{enableBackdropDismiss:false})
             modal.present();
            } else if(data === 'info paiement') {
   let toastOk = this.toastCtrl.create({
     message: 'Paiement accepté',
     position: 'middle',
     duration: 10000
     
     
   });
   toastOk.present();
 } else {
  let alert = this.alertCtrl.create({
    title: 'Incident paiement',
   buttons: [
    {
      text: 'Annuler',
      handler: () => {
        console.log('proceed payment avort');
      }
    },
    {
      text: 'Réessayer',
      handler: (total) => {
        
        let toast = this.toastCtrl.create({
          message: 'Veuillez suivre les instructions sur le terminal de paiement...',
          position: 'middle',
          duration: 10000  
        });
        toast.present();
        
        this.cartPvd.checkOut(this.invoice);
      }
    }
  ],
enableBackdropDismiss:false
  });
  alert.present();
 }
    
  }
  
  ionViewDidLoad() {
   this.sub = this.rest.getStatus()
    .subscribe(data => {
      this.data = data;
      console.log(data);
      this.status(data);
      
    })
    console.log(this.articles)
  }

}