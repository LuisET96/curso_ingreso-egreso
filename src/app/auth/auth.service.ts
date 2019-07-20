import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as firebase from 'firebase';

import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromUI from '../shared/ui.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDb: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser: firebase.User) => { });
  }

  signUp(email: string, nombre: string, password: string): void {
    this.store.dispatch(fromUI.activarLogin());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        const user: User = {
          uid: res.user.uid,
          nombre,
          email: res.user.email
        };

        this.afDb.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {
            this.router.navigateByUrl('/');
          });

        this.store.dispatch(fromUI.desactivarLogin());
      })
      .catch(err => {
        Swal.fire('Error en el registro', err.message, 'error');
        this.store.dispatch(fromUI.desactivarLogin());
      });
  }

  signIn(email: string, password: string): void {
    this.store.dispatch(fromUI.activarLogin());

    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigateByUrl('/');
        this.store.dispatch(fromUI.desactivarLogin());
      })
      .catch(err => {
        Swal.fire('Error en el login', err.message, 'error');
        this.store.dispatch(fromUI.desactivarLogin());
      });
  }

  logOut(): void {
    this.router.navigateByUrl('/login');
    this.afAuth.auth.signOut();
  }

  isAuth(): Observable<boolean> {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {
          if (!fbUser) {
            this.router.navigateByUrl('/login');
          }

          return fbUser !== null;
        })
      );
  }
}
