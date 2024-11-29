import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}

  onLogin() {
    this.authService.login();
    this.router.navigateByUrl('/places/discover');
  }
}
