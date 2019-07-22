import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {
  constructor(
    private afDB: AngularFirestore,
    private auth: AuthService
  ) { }

  crearIE(ingresoEgreso: IngresoEgreso) {
    const user = this.auth.getUser();

    return this.afDB.doc(`${user.uid}/ingresos-egresos`)
      .collection('items').add({ ...ingresoEgreso });
  }
}
