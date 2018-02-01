import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RestProvider } from '../providers/rest/rest';
import { BornePage } from '../pages/borne/borne';
import { CartProvider } from '../providers/cart/cart';
import { CartPage } from '../pages/cart/cart';
import { OutOfServicePage } from '../pages/out-of-service/out-of-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    BornePage,
    CartPage,
    OutOfServicePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    BornePage,
    CartPage,
    OutOfServicePage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    HttpClientModule,
    CartProvider
  ]
})
export class AppModule {}
