import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HospitalService } from '../Services/hospital.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalGuard implements CanActivate {
  role: string;
  constructor(private router: Router) {
    this.role = "";
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.role = localStorage.getItem("role") || "";
    if (this.role == "hospital") {
      return true;
    } else {
      this.router.navigate(['homepage']);
      return false
    }

  }

}
