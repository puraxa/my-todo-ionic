import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ){}
  canActivate() {
    if(this.auth.isLoggedIn){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
