// сервіс для авторизації

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FbAuthResponse, User } from "../theme/interfaces";
import { Observable, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class AuthService {
  // змінна для обробки помилок типу Subject<string>
  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {}

  // для отримання токена

  get token(): string | null {
    const expDateString = localStorage.getItem("fb-token-exp");
    if (!expDateString) {
      return null; // Если значение не найдено, вернуть null
    }

    const expDate = new Date(expDateString);

    if (isNaN(expDate.getTime())) {
      return null; // Если значение некорректно, вернуть null
    }

    if (new Date() > expDate) {
      this.logOut();
      null;
    }
    return localStorage.getItem("fb-token");
  }

  login(user: User): Observable<any> {
    user.returnSecureToken = true;
    return (
      this.http
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
          user
        )
        // pipe используется для объединения нескольких операторов (функций) в цепочку обработки данных в потоке Observable.
        // tap используется для выполнения побочного действия
        .pipe(tap(this.setToken), catchError(this.handleError.bind(this)))
    );
  }

  logOut() {
    this.setToken(null);
  }

  // для перевірки статусу користувача
  isAuth(): boolean {
    return !!this.token;
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const { message } = error.error.error;
    console.log(message);
    switch (message) {
      case "INVALID_LOGIN_CREDENTIALS":
        this.error$.next("не вірний емейл або пароль");
        break;
    }

    return throwError("Something bad happened; please try again later.");
  }

  // для зміни токена
  private setToken(response: any | null) {
    if (response) {
      const fbAuthResponse: FbAuthResponse = response as FbAuthResponse;
      const expData = new Date(
        new Date().getTime() + +response.expiresIn * 1000
      );
      // для збереження токена в localStorage
      localStorage.setItem("fb-token", response.idToken);
      localStorage.setItem("fb-token-exp", expData.toString());
    } else {
      localStorage.clear();
    }
  }
}
