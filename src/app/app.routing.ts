import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogupComponent } from './auth/logup/logup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routing';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LogupComponent },
  { path: '', component: DashboardComponent, children: dashboardRoutes },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
