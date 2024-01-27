import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { SheintableComponent } from './sheintable/sheintable.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';



const firebaseConfig = { apiKey: "AIzaSyBordW3FDRtiqFD4VlJXqdl2XrUZzV-j2o",
authDomain: "loginshein-e7033.firebaseapp.com",
projectId: "loginshein-e7033",
storageBucket: "loginshein-e7033.appspot.com",
messagingSenderId: "435758152351",
appId: "1:435758152351:web:c13ece8239dc1bf62fc0aa",
measurementId: "G-20LVKBMFHK"}


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SheintableComponent,
    AboutmeComponent,
    LoginComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    HttpClientModule,

  ],
  
  providers: [
    provideClientHydration(),
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
