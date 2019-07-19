import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logup',
  templateUrl: './logup.component.html',
  styles: []
})
export class LogupComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

  onSubmit(data: any): void {
    this.auth.signUp(data.email, data.nombre, data.pass);
  }
}
