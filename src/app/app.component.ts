import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { GraphPage } from '../pages/graph/graph';
//import { GraphtwoPage } from '../pages/graphtwo/graphtwo';
//import { HomePage } from '../pages/home/home';
import { HomeonePage } from '../pages/homeone/homeone';
//import { HometwoPage } from '../pages/hometwo/hometwo';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomeonePage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

