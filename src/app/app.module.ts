import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { HometwoPage } from '../pages/hometwo/hometwo';

//import { HttpClientModule } from '@angular/common/http';
import { NetworkEngineProvider } from '../providers/network-engine/network-engine';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GraphPage } from '../pages/graph/graph';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule, } from 'angularfire2';
//import { AngularFire } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
//import { TabsPage } from '../pages/tabs/tabs';
import { environment } from '../environments/environment';
//import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//import { AuthServiceProvider } from '../providers/auth-service/auth-service';
//import { GraphtwoPage } from '../pages/graphtwo/graphtwo';
//import { PeopleServiceProvider } from '../providers/people-service/people-service';
//import { Chart } from 'angular-highcharts';
//import * as highcharts from 'highcharts';
@NgModule({
  declarations: [
    MyApp,
     HometwoPage,
   //  GraphtwoPage,
        GraphPage,
    HomePage
  ],
  imports: [
    BrowserModule,HttpClientModule,
   // Chart.forRoot(highcharts),
    IonicModule.forRoot(MyApp),
       AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
     AngularFireDatabaseModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
     HometwoPage,
    HomePage,
  //  GraphtwoPage,
   GraphPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
     AngularFireAuth,

        DatePicker,
          LocalNotifications,

    NetworkEngineProvider,
   // AuthServiceProvider,
  //  AuthServiceProvider
  ]
})
export class AppModule {}
