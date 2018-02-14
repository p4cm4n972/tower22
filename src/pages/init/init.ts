import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { BornePage } from '../borne/borne';
import { OutOfServicePage } from '../out-of-service/out-of-service';
import { Subscription } from 'rxjs/Subscription';
import { HomePage } from '../home/home';
/**
 * Generated class for the InitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-init',
  templateUrl: 'init.html',
})
export class InitPage {
  params: Object;
  pushPage: any;
  response: any;
  error: string;
  outOfService: boolean = true;
  sub: Subscription;
  data;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public rest: RestProvider, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  }
 status(data) {
   if(data === 'inService'){
  this.navCtrl.push(HomePage);
  let modal = this.modalCtrl.create(BornePage,{outOfService:false},{enableBackdropDismiss:false})
            modal.present();
} else {
  this.navCtrl.push(OutOfServicePage)
}
   
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitPage');
    this.sub = this.rest.getStatus()
    .subscribe(data => {
      this.data = data;
      this.status(data);
    })
  }
  

}
