import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularFireAuthModule } from '@angular/fire/auth';

import { LoginComponent } from './login/login.component';
import { LogupComponent } from './logup/logup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginComponent,
    LogupComponent
  ],
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule
  ]
})
export class AuthModule { }
