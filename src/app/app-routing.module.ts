import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheintableComponent } from './sheintable/sheintable.component';
import { AboutmeComponent } from './aboutme/aboutme.component';

const routes: Routes = [
  { path: "Shein", component: SheintableComponent },
  { path: "About", component: AboutmeComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
