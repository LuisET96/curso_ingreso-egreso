import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgresoModel } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as fromMovimientos from './ingreso-egreso.actions';

import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  private ingresoEgresoListenerSubs: Subscription;
  private ingresoEgresoItemsSubs: Subscription;

  constructor(
    private afDB: AngularFirestore,
    private auth: AuthService,
    private store: Store<AppState>
  ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubs = this.store.select('auth')
      .pipe(
        filter(auth => auth.user != null)
      )
      .subscribe(auth => {
        this.getIEItems(auth.user.uid);
      });
  }

  private getIEItems(uid: string) {
    this.ingresoEgresoItemsSubs = this.afDB.collection(`${uid}/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(docData => {
          return docData.map(doc => {
            return {
              uid: doc.payload.doc.id,
              ...doc.payload.doc.data()
            };
          });
        })
      )
      .subscribe((items: any[]) => {
        this.store.dispatch(fromMovimientos.setItemsAction({ items }));
      });
  }

  cancelarSubscripciones() {
    this.ingresoEgresoListenerSubs.unsubscribe();
    this.ingresoEgresoItemsSubs.unsubscribe();
  }

  crearIE(ingresoEgreso: IngresoEgresoModel) {
    const user: User = this.auth.getUser();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }
}
