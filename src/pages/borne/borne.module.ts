import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BornePage } from './borne';

@NgModule({
  declarations: [
    BornePage,
  ],
  imports: [
    IonicPageModule.forChild(BornePage),
  ],
})
export class BornePageModule {}
