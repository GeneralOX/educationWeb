import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class InstructorGuard implements CanActivate {
  constructor(private api: ApiService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const obj = this.api.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj);
      const role = this.api.auth.PermissionRedirect(usr.role);
      if (role == "instructor")
        return true;
    }
    this.router.navigate(["/"])
    return false;
  }
}