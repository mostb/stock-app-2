import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
//import firebase from 'firebase';
/*
  Generated class for the NetworkEngineProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class NetworkEngineProvider {

  constructor(public http: HttpClient) {
    console.log('Hello NetworkEngineProvider Provider');
  }


  readTable():Promise<any>
  {
    let url="https://dev.kwayisi.org/apis/gse/live?results=5";
    let request=this.http.get(url);

    return request.toPromise();

  }
  
 
  
  readsTable():Promise<any>
  {
    let url="https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=EUR&apikey=SCF0MM7YXEU2BVDL";
    let request=this.http.get(url);

    return request.toPromise();

  }



   call(n):Promise<any>
  {
    let url="https://westus.api.cognitive.microsoft.com/qnamaker/v2.0/knowledgebases/30f1c7f4-80e7-4f74-adf1-7ce201334ad9/generateAnswer";
    let param=n;
    const httpOptions = {
     headers: new HttpHeaders({
     'Content-Type':  'application/json',
     "Ocp-Apim-Subscription-Key": "  e0b09f89913148889ec66dfa0e4c7caf"
    })};

    let request=this.http.post(url,param,httpOptions);

    return request.toPromise();

  }





 




  
 
}
