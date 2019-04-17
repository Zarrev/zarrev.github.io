import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthorizationService} from './authorization.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CanActivatePage implements CanActivate {
  constructor(private auth: AuthorizationService, private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.auth.isLoggedIn) {
      return this.router.parseUrl('home');
    }
    return true;
  }
}
