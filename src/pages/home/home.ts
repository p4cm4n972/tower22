import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
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
  outOfService: boolean = true;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, private rest: RestProvider, private toastCtrl: ToastController, public modalCtrl: ModalController) {
    this.pushPage = BornePage;

  }
  //OUT OF SERVICE : ERROR:ERROR HTTP or RESPONSE: OUTOFSERVICE 
  oos() {
    console.log('OUT OF SERVICE !');
    let loaderOOS = this.loadingCtrl.create({
      spinner: 'bubbles',
      content: `
<div><h2><span>Sorry...</span><br>TEMPORARILY OUT OF SERVICE</h2></div>
`
    });
    loaderOOS.present();
  }
  //INITIALISATION CONNECTION HEARTBEAT
  initialisation() {
    let loader = this.loadingCtrl.create({
      content: "Initialisation en cours, veuillez patientez..."
    });
    loader.present();
    this.rest.initialisation().subscribe(response => {
      this.response = response;
      console.log(response);
      if (this.response.ProductMode !== 'inService') {
        this.outOfService = false;
        setTimeout(() => {
          loader.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Connection server successfully',
            duration: 3000,
            position: 'top',
          });
          toast.onDidDismiss(() => {
            let modal = this.modalCtrl.create(BornePage)
            modal.present();
          });

          toast.present();
        }, 2000);
      } else {
        loader.dismiss();
        this.oos();
      }
    },
      error => {
      this.error = <any>error;
        console.log("http failure");
        this.oos();
      }
    )
  }




  ionViewDidLoad() {
    this.initialisation();
  }
}