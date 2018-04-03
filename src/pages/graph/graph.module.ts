import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphPage } from './graph';
//import { Chart } from 'angular-highcharts';
//import * as highcharts from 'highcharts';


@NgModule({
  declarations: [
    GraphPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphPage),
    // Chart.forRoot(highcharts)
  ],
})
export class GraphPageModule {}
