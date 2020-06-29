import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module'
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AppComponent } from './app.component';
import { ListUserComponent } from './components/list-component/list-user.component';
import { LoginComponent } from './components/admin/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AngularFirestore } from '@angular/fire/firestore';

export const environment = {
  production: false,
  config: {
    apiKey: "AIzaSyA5oNSiXHponAehCBRrAp1KWnpYF3jXB64",
    authDomain: "user-portal-6c2a2.firebaseapp.com",
    databaseURL: "https://user-portal-6c2a2.firebaseio.com",
    projectId: "user-portal-6c2a2",
    storageBucket: "user-portal-6c2a2.appspot.com",
    messagingSenderId: "853240610951",
    appId: "1:853240610951:web:631dd9795613d34acaf822"
  }
}

@NgModule({
  declarations: [
    AppComponent,
    ListUserComponent,
    LoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
