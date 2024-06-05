
// сервіс перевіряє чи користувач увійшов у систему чи вийшов з неї 

import { EventEmitter, Injectable, Output, ɵisPromise } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  [x: string]: any;
   // Сервіс використовує BehaviorSubject для створення спостерігача (observable) зі стандартним значенням по замовчуванню false. 
   // Це дозволяє іншим частинам додатку підписуватися на зміни стану аутентифікації та отримувати поточний стан в будь-який момент часу.
  private isAuthSubject = new BehaviorSubject<boolean>(false);
   //інші компоненти та сервіси можуть підписатися на зміни стану аутентифікації
    // через isAuth$ та виконувати дії в залежності від того, чи користувач увійшов в систему чи вийшов з неї.
  isAuth$ = this.isAuthSubject.asObservable();

  login() {
    this.isAuthSubject.next(true);
  }

  logout() {
    this.isAuthSubject.next(false);
  }
    //Повертає обіцянку (Promise) для отримання стану аутентифікації.
    //Результат обіцянки - це поточне значення isAuthSubject, що представляє поточний стан аутентифікації.
  isUserLogin(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.isAuthSubject.value);
      },);
    });
  }
}
