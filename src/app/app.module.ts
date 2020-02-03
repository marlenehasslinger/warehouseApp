import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import {AngularFireAuthModule } from '@angular/fire/auth';
import {AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    IonicModule.forRoot({
      scrollPadding: false,
      scrollAssist: true, 
  }), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    BarcodeScanner,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
