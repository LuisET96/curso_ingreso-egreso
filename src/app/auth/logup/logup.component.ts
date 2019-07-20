import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styles: []
})
export class LogupComponent implements OnInit, OnDestroy {
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
    this.auth.signUp(data.email, data.nombre, data.pass);
  }
}
