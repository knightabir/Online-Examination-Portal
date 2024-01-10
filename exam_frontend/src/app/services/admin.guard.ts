import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const isLoggedIn = this.loginService.isLoggedIn();
      const hasAdminRole = isLoggedIn && this.loginService.getUserRole() === 'ADMIN';
      return hasAdminRole;
    } else {
      // Handle non-browser environment logic here
      this.router.navigate(['login']); // Redirect to login for non-browser environments
      return false;
    }
  }
}
