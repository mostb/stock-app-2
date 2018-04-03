import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import * as HighCharts from 'highcharts';
import { HometwoPage } from '../../pages/hometwo/hometwo';
//import { Chart } from 'angular-highcharts';
//import * as HighchartsMore from 'highcharts-more';
/**
 * Generated class for the GraphPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-graph',
  templateUrl: 'graph.html',
})
export class GraphPage {
    responseTxt:any;
    response:any;
  parsedData:any;
  displayData:any;
  send:any;
 // myname:any;

  myname = [];
  myprice=[];
  mychange=[];
  myvolume=[];
  
  constructor(public network: NetworkEngineProvider,public navCtrl: NavController, public params: NavParams) {
     this.network.readTable().then(data=>
    {
     this.response=""+JSON.stringify(data);
    //console.log("I received: "+JSON.stringify(data));
    //this.responseTxt=JSON.stringify(data);
     this.responseTxt=JSON.stringify(data);
    this.parsedData = JSON.parse(this.responseTxt);

    this.send= this.parsedData.sort(function(a, b) {
           return b.price - a.price;
      });

    this.displayData = this.send.slice(0,5);
   

    
     
     this.myname.push(this.displayData[0].name);
     
     this.myprice.push(this.displayData[0].price);
     this.myvolume.push(this.displayData[0].volume/1000);
     this.mychange.push(this.displayData[0].change);
     
   
     
     this.myname.push(this.displayData[1].name);
     
     this.myprice.push(this.displayData[1].price);
     this.myvolume.push(this.displayData[1].volume/1000);
     this.mychange.push(this.displayData[1].change);
     
     
     this.myname.push(this.displayData[2].name);
     
     this.myprice.push(this.displayData[2].price);
     this.myvolume.push(this.displayData[2].volume/1000);
     this.mychange.push(this.displayData[2].change);
     
     
     this.myname.push(this.displayData[3].name);
     
     this.myprice.push(this.displayData[3].price);
     this.myvolume.push(this.displayData[3].volume/1000);
     this.mychange.push(this.displayData[3].change);

     
     
     this.myname.push(this.displayData[4].name);
     
     this.myprice.push(this.displayData[4].price);
     this.myvolume.push(this.displayData[4].volume/1000);
     this.mychange.push(this.displayData[4].change);

    

    })
    


}

  read()
{
   this.navCtrl.push(HometwoPage);
   
}
  showTable()
  {
    this.network.readTable().then(data=>
    {
     this.response=""+JSON.stringify(data);
    //console.log("I received: "+JSON.stringify(data));
    //this.responseTxt=JSON.stringify(data);
     this.responseTxt=JSON.stringify(data);
    this.parsedData = JSON.parse(this.responseTxt);

    this.send= this.parsedData.sort(function(a, b) {
           return b.price - a.price;
      });

    this.displayData = this.send.slice(0,5);

     // for (i = 0; i < 6; i++) {
     
    // }
     
    })

     
    
   }
ionViewDidEnter(){
 console.log('ionViewDidLoad GraphPage');
  //this.showTable();  
 var myChart = HighCharts.chart('container', {
chart: {

},
title: {
text: 'Stock Exchange'
},
xAxis: {
categories: ['Price(GH)',  'Change','Volume(K)']
},
yAxis: {
title: {
text: 'Stock Chart'
}
},
series: [


{
type: 'bar',
name: this.myname[0],
data: [this.myprice[0], this.mychange[0], this.myvolume[0]]

 
 },
 
{type: 'bar',
name: this.myname[1],
data: [this.myprice[1], this.mychange[1], this.myvolume[1]]

 
 },
 
 {type: 'bar',
name: this.myname[2],
data: [this.myprice[2], this.mychange[2], this.myvolume[2]]

 
 },
 
{type: 'bar',
name: this.myname[3],
data: [this.myprice[3], this.mychange[3], this.myvolume[3]]

 
 },

{
type: 'bar',
name: this.myname[4],
data: [this.myprice[4], this.mychange[4], this.myvolume[4]]
}]
});
}

}
