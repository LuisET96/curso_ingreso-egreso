import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean;
  subscription: Subscription;

  constructor(
    private auth: AuthService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('ui')
      .subscribe(ui => this.isLoading = ui.isLoading);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit(data: any): void {
    this.auth.signIn(data.email, data.pass);
  }
}
