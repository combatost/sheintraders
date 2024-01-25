import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './navigation/navigation.component';
import { SheintableComponent } from './sheintable/sheintable.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LoginComponent } from './login/login.component';






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
    
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
