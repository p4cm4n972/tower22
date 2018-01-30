import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BornePage } from '../borne/borne';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  params: Object;
  pushPage: any;
  response: Object;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private rest: RestProvider, private toastCtrl: ToastController) {
    this.pushPage = BornePage;

  }
  initialisation() {
    let loader = this.loadingCtrl.create({
      content: "Initialisation encours, Veuillez patienter..."
    });
    loader.present();
    this.rest.initialisation().subscribe(response => {
      this.response = response;

      console.log(response);
      setTimeout(() => {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Connection server successfully',
          duration: 3000,
          position: 'top',
        });
        toast.onDidDismiss(() => {
          console.log('OK');
        });

        toast.present();
      }, 3000);

    })
  }


  ionViewDidLoad() {
    this.initialisation();
  }
}
