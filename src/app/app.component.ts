import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { BornePage } from '../pages/borne/borne';
import { CartPage } from '../pages/cart/cart';
import { OutOfServicePage } from '../pages/out-of-service/out-of-service';
import { InitPage } from '../pages/init/init';
//

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  pages: Array<{title: string, component: any}>;
  
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Borne', component: BornePage },
      { title: 'Cart', component: CartPage },
      { title: 'OOS', component: OutOfServicePage},
      { title: 'Init', component: InitPage}
    ];
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

