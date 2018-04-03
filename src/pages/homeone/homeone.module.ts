import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeonePage } from './homeone';

@NgModule({
  declarations: [
    HomeonePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeonePage),
  ],
})
export class HomeonePageModule {}
