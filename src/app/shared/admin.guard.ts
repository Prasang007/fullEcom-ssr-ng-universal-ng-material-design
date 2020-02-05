import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private sharedService: SharedService, private router: Router, private snackbar: MatSnackBar) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.sharedService.loggedIn && this.sharedService.isAdmin) {
      return true;
    } else {
      if (this.sharedService.loggedIn) {
        this.snackbar.open('You are not Authorized to acess that !', 'Close', { duration: 2000});
        this.router.navigate(['/products']);
      } else {
        this.router.navigate(['/login']);
      }
      return false;
    }
  }
}

