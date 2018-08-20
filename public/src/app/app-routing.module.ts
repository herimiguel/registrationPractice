import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppointmentComponent } from './appointment/appointment.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent},
  { path: 'toDashboard', pathMatch: 'full', component: DashboardComponent},
  { path: 'toApt', pathMatch: 'full', component: AppointmentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
