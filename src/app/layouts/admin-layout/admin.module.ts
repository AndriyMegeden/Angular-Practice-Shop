// роутінг для адмінки для lazy loading

// це потрібно шоб дата відображалась на українській мові до прикладу 

import { CommonModule, registerLocaleData } from "@angular/common";
// тут ми вибираємо мову коли імпортуємо ukLocale - можна назвати як завгодно 
import  ukLocale  from "@angular/common/locales/uk";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout.component";
import { LoginPageComponent } from "src/app/login-page/login-page.component";
import { DashboardPageComponent } from "src/app/dashboard-page/dashboard-page.component";
import { CreatePageComponent } from "src/app/create-page/create-page.component";
import { EditPageComponent } from "src/app/edit-page/edit-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { SharedModule } from "../http.module";
import { AuthGuard } from "src/app/services/auth.guard";
import { searchPipe } from "src/app/pipes/search.pipe";
import { AlertComponent } from "src/app/theme/components/alert/alert.component";
import { AlertService } from "src/app/services/alert.service";

// це потрібно шоб дата відображалась на українській мові до прикладу 
registerLocaleData(ukLocale, 'uk');

@NgModule({
  // декларуємо адмін лояут і підключаємо до нього інші сторінки
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    searchPipe,
    AlertComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "",
        component: AdminLayoutComponent,
        children: [
          // робим так шоб зразу переносило на сторінку login
          { path: "", redirectTo: "/admin/login", pathMatch: "full" },
          { path: "login", component: LoginPageComponent },
          // canActivate: [AuthGuard] потрібен для захисту сторінок
          {
            path: "dashboard",
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "create",
            component: CreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: "post/:id/edit",
            component: EditPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AlertService],
  // заносим сюда сервіс для авторизації і інші
})
export class AdminModule {}
