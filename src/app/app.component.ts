import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  constructor() {}
  onLogout() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
