
// сервіс для вспливаючих повідомлень
// додали відображення повідомлення в create page 
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

export type AlertType = "success" | "warning" | "danger";

export interface Alert {
  type: AlertType;
  text: string;
}

@Injectable()
export class AlertService {

    // Кожен метод отримує текст повідомлення і відправляє його через Subject<Alert>, який є властивістю alert$.
    // Коли викликається один із методів сервісу AlertService, він викликає метод next() для Subject<Alert>, 
    // щоб повідомити всіх своїх підписників про нове повідомлення. Кожен підписник, який підписався на потік alert$,
    //  отримує нове повідомлення і може відповідно обробити його, наприклад, відобразити вспливаюче повідомлення в інтерфейсі користувача.

  public alert$ = new Subject<Alert>();

  success(text: string) {
    this.alert$.next({type: 'success', text});
  }

  warning(text: string) {
    this.alert$.next({type: 'warning', text});
  }

  danger(text: string) {
    this.alert$.next({type: 'danger', text});
  }
}
