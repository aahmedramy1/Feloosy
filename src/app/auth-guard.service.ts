import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser === null) {
      // If no user is logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
