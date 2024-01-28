import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheintableComponent } from './sheintable/sheintable.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to LoginComponent
  { path: '**', component: LoginComponent },
  { path: 'sheintable' ,component: SheintableComponent},
  { path: 'aboutme' , component: AboutmeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
