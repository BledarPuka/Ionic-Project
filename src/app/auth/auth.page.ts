import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private loadingCtrl = inject(LoadingController);
  // isLoading = false;
  isLogin = true;
  constructor() {}

  onLogin() {
    // this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          // this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/discover');
        }, 1000);
      });
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);
  }
}
