import { inject, Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  private authService = inject(AuthService);
  private router = inject(Router);
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.userAuthenticated) {
      this.router.navigateByUrl('/auth');
    }
    return this.authService.userAuthenticated;
  }
}
