import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { LogupComponent } from './auth/logup/logup.component';
import { AuthGuard } from './auth/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: LogupComponent },
  {
    path: '',
    loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule',
    canLoad: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
