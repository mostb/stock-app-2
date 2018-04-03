import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NetworkEngineProvider } from '../../providers/network-engine/network-engine';
import { GraphPage } from '../graph/graph';
//import { GraphtwoPage } from '../graphtwo/graphtwo';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  //providers: [PeopleService]
})
export class HomePage {

 
   //public people: any;
     responseTxt:any;
    response:any;
  parsedData:any;
  displayData:any;
  send:any;
 
  



  constructor(public network: NetworkEngineProvider,public navCtrl: NavController){
     // this.loadPeople();
     this.showTable();
  }



  read()
{
   this.navCtrl.push(GraphPage);
   
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

   

}
