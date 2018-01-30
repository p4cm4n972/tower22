import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private rest: RestProvider) {

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

      }, 5000);
    })
  }
  ionViewDidLoad() {
    this.initialisation();
  }
}
