import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { BornePage } from '../borne/borne';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
<<<<<<< HEAD
import { OutOfServicePage } from '../out-of-service/out-of-service';
=======
>>>>>>> da2eb2f8



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  params: Object;
  pushPage: any;
  response: any;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private rest: RestProvider, private toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.pushPage = BornePage;

  }
  initialisation() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.rest.initialisation().subscribe(response => {
      this.response = response;

      console.log(response);
      if (this.response.ProductMode === 'outOfService') {

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
<<<<<<< HEAD
        }, 3000);
=======
        }, 2000);
>>>>>>> da2eb2f8
      } else {
        console.log('OUT OF SERVICE !');
        loader.dismiss();
        /*let modal = this.modalCtrl.create(OutOfServicePage, {}, {enableBackdropDismiss: false} );
        modal.present();*/
        let loaderOOS = this.loadingCtrl.create({
          spinner: 'bubbles',
          content: `
    <div><h2><span>Sorry...</span><br>TEMPORARILY OUT OF SERVICE</h2></div>
    `
        });
        loaderOOS.present();
      }

    })
  }

  openApp() {
    let modal = this.modalCtrl.create(BornePage)
    modal.present();
  }


  ionViewDidLoad() {
    this.initialisation();
  }
}