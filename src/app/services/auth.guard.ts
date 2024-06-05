//Цей код представляє Angular сервіс, який використовується в якості охоронця маршрутів (AuthGuard).
// Основна мета цього сервісу - перевірка, чи користувач має доступ до певної сторінки, перш ніж відбудеться перехід.

import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  mapToCanActivateChild,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })

// CanActivateChild для дочірніх елементів
export class AuthGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}

  // Метод canActivate:
  //Цей метод визначається згідно інтерфейсу CanActivate, що вказує, чи може користувач отримати доступ до певної сторінки.
  //Викликається при спробі навігації на конкретну сторінку.
  //В разі успішної перевірки аутентифікації, повертається true, дозволяючи навігацію на задану сторінку.
  //Якщо isAuth є false, відбувається перенаправлення на сторінку 'login' із параметром auth: false, і повертається false, щоб заборонити доступ.

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isAuth()) {
      return true;
    } else {
      this.auth.logOut();
      return this.router.navigate(["/admin", "login"], {
        queryParams: {
            loginAgain: true
        },
      });
    }
  }

  // CanActivateChild для дочірніх елементів

  //   canActivateChild(
  //     route: ActivatedRouteSnapshot,
  //     state: RouterStateSnapshot
  //   ): Observable<boolean> | Promise<boolean> | boolean {
  //     return this.canActivate(route, state);
  //   }
}
