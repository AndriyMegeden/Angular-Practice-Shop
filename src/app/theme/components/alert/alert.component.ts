// компонент який буде виводити сповіщення і працювати з сервісом

import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscribable, Subscription } from "rxjs";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 5000

  public text!: string
  public type = 'success'

  aSub!: Subscription

  constructor(private alertService: AlertService) { }


  // У методі ngOnInit компонент підписується на потік сповіщень, що надходять з сервісу AlertService.
  // Кожне нове сповіщення оновлює текст і тип сповіщення компонента. Також встановлюється таймер за допомогою setTimeout,
  // який приховує сповіщення через заданий період часу (за замовчуванням 5 секунд).
  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout)
        this.text = ''
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }
}
