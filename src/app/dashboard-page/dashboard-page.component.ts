import { Component, OnDestroy, OnInit } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { Post } from "../theme/interfaces";
import { Subscription } from "rxjs";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public posts: Post[] = [];
  public pSub!: Subscription;
  public dSub!: Subscription;
  public searchStr = "";
  constructor(private postService: PostsService) {}


// тут іде підписка на результат виконання методу remove сервісу postService. 
// Коли ви викликаєте this.postService.remove(id), він відправляє запит на сервер для видалення поста за вказаним id.
//  Після успішного видалення, метод subscribe викликається, і ви виконуєте логіку з фільтрацією масиву this.posts, 
// щоб видалити пост з відповідним id. Це потрібно для того, щоб оновити дані, які відображаються в інтерфейсі 
  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
    });
  }

  ngOnInit() {
    // Цей рядок викликає метод getAll() сервісу postService, що повертає Observable, який видає масив постів.
    // Метод subscribe() підписує компонент на Observable. Коли дані будуть отримані,
    // передана функція колбеку буде викликана з результатом запиту (масивом постів).
    // У цьому випадку, отримані дані (posts) призначаються властивості posts компонента, щоб їх можна було використовувати в шаблоні для відображення.
    this.dSub = this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
