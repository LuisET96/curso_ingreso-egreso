import { Component, OnInit } from '@angular/core';

import { User } from '../../auth/user.model';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { IngresoEgresoService } from '../../ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  user: User = new User('', '', '');

  constructor(
    private store: Store<AppState>,
    private auth: AuthService,
    private IEServiece: IngresoEgresoService
  ) { }

  ngOnInit() {
    this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this.user = auth.user;
      });
  }

  logOut(): void {
    this.IEServiece.cancelarSubscripciones();
    this.auth.logOut();
  }
}
