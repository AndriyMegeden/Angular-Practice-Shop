import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { PostPageComponent } from "./post-page/post-page.component";
import { SharedModule } from "./layouts/http.module";

const routes: Routes = [
  // тут наш роутінг для сторінок home i post які знаходяться в mainlayout
  {
    path: "",
    component: MainLayoutComponent,
    children: [
      { path: "", redirectTo: "/", pathMatch: "full" },
      { path: "", component: HomePageComponent },
      { path: "post/:id", component: PostPageComponent },
    ],
  },
  // шлях для адмінки для lazy loading
  {
    path: "admin",
    loadChildren: () =>
      import("./layouts/admin-layout/admin.module").then((m) => m.AdminModule),
  },
];

@NgModule({
  // стратегія загрузки lazy loading модулів
  imports: [
    SharedModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  

  exports: [RouterModule],
  
})
export class AppRoutingModule {}
