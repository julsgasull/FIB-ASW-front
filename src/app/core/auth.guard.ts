import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router} from "@angular/router";
import { FirebaseUserService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor (
    public userService: FirebaseUserService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser()
      .then(
        user => {
          this.router.navigate(['/userinfo']);
          return resolve(false);
        }, 
        err => {
          return resolve(true);
        }
      )
    })
  }
}