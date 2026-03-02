import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../security/authorization.service';

@Injectable()
export class SegurancaGuard implements CanActivate {

  constructor(
    private router: Router,
    private authorizationService: AuthorizationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.authorizationService.isAccessTokenInvalido()) {
        this.authorizationService.limparAccessToken();
        this.router.navigate(['/login']);        
      } else if (next.data['authorities']) {
        this.router.navigate(['/nao-autorizado']);
        return false;
      }

      return true;

  }

}