import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private auth: AuthService) { }

  canActivate(): Observable<boolean> {
    return this.auth.isAuth();
  }

  canLoad(): Observable<boolean> {
    return this.auth.isAuth()
      .pipe(
        take(1)
      );
  }
}
