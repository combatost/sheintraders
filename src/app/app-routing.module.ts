import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SheintableComponent } from './sheintable/sheintable.component';
import { AboutmeComponent } from './aboutme/aboutme.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard'; // Import the AuthGuard
import { SettingsComponent } from './settings/settings.component';
import { AnalysicComponent } from './analysic/analysic.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sheintable', component: SheintableComponent, canActivate: [AuthGuard] },
  { path: 'aboutme', component: AboutmeComponent, canActivate: [AuthGuard] },
  { path: 'analysic', component: AnalysicComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)], // Configure routes
  exports: [RouterModule] // Export the configured router module
})
export class AppRoutingModule { }
