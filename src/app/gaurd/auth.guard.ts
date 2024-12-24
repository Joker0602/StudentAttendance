import { userService } from 'src/app/service/user.service';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const roles = next.data['roles'] as Array<string>;
    const userId = +next.data['userId'];
    const userLocal = localStorage.getItem('LoggedInUser');

    if (userLocal) {

      try {
        const user = JSON.parse(userLocal);

        // Proceed with the rest of your logic
        if (roles) {


          let match: boolean = false;
          for (let i = 0; i < roles.length; i++) {
            if (user.Role == roles[i]) {
              match = true;
              break;
            }
          }

          if (match) {
            return true;
          } else {
            return match;
          }
        }
      } catch (error) {
        return false;
      }
    } else {
      alert("Please Loggin First")
      this.router.navigate(['/login'])
    }
    return false
  }
}
