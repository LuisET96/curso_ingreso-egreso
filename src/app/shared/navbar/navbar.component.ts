import { Component, OnInit } from '@angular/core';

import { User } from '../../auth/user.model';

import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  user: User = new User('', '', '');

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('auth')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(auth => {
        this.user = auth.user;
      });
  }
}
