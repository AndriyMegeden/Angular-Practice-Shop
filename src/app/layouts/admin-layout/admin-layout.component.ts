import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";


@Component({
  selector: "app-admin-layout",
  templateUrl: "./admin-layout.component.html",
  styleUrls: ["./admin-layout.component.scss"],
})
export class AdminLayoutComponent implements OnInit {
  constructor(public router: Router, public auth: AuthService) {}

  ngOnInit() {}

  logout(event: Event) {
    // блокує перехід за звичайним посиланням
    event.preventDefault();
    // виходим з сторінки
    this.auth.logOut();
    // при натисканні вийти попадаєм на сторінку login
    this.router.navigate(["/admin", "login"]);
  }
}
