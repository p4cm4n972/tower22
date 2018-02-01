import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OutOfServicePage } from './out-of-service';

@NgModule({
  declarations: [
    OutOfServicePage,
  ],
  imports: [
    IonicPageModule.forChild(OutOfServicePage),
  ],
})
export class OutOfServicePageModule {}
