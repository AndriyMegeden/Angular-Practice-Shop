import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { User } from "../theme/interfaces";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"],
})
export class LoginPageComponent implements OnInit {
  form!: FormGroup;
  
  // це потрібно для блокування кнопки якщо йде запрос на сервер
  submited = false;
  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    // Створюємо об'єкт FormGroup з необхідними полями
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    // коли іде запрос на сервер кнопка заблокована
    this.submited = true;
    console.log(this.form);

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.auth.login(user).subscribe(
      () => {
        this.form.reset();
        this.router.navigate(["/admin", "dashboard"]);
         // коли запрос пройшов кнопка розблоковується
        this.submited = false;
      },
      () => {
        this.submited = false;
      }
    );
  }
}

