import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { BornePage } from '../borne/borne';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  params: Object;
  pushPage: any;
  response: any;
  error: string;
  outOfService: boolean;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public modalCtrl: ModalController) {
    this.pushPage = BornePage;

  }
  




  ionViewDidLoad() {
    let modal = this.modalCtrl.create(BornePage,{outOfService:false},{enableBackdropDismiss:false})
            modal.present();
  }
}