import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private rest: RestProvider, private toastCtrl: ToastController) {

  }
  initialisation() {
    let loader = this.loadingCtrl.create({
      content: "Initialisation encours, Veuillez patienter..."
    });
    loader.present();
    this.rest.initialisation().subscribe(response => {
      console.log('response');
      setTimeout(() => {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Connection server successfully',
          duration: 3000,
          position: 'top',
          cssClass: 'text-center'
        });
        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
        });

        toast.present();
      }, 5000);

    })
  }
  ionViewDidLoad() {
    this.initialisation();
  }
}
