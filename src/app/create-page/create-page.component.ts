import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Post } from "../theme/interfaces";
import { PostsService } from "../services/posts.service";
import { AlertService } from "../services/alert.service";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"],
})
export class CreatePageComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private postsService: PostsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    // У методі submit() створюється об'єкт Post на основі даних з форми, які користувач ввів.
    // Потім цей об'єкт передається до методу create(post: Post) сервісу postsService.
    // Ви підписуєтесь на результат цього запиту за допомогою методу subscribe().
    //Коли запит завершиться, ви виконуєте дії, які потрібно виконати після успішного створення поста, наприклад, очищення форми.

    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      id: this.form.value.id,
      date: new Date(),
    };

    this.postsService.create(post).subscribe(() => {
      this.form.reset();
      // відображення нашого повідомлення
      this.alertService.success("Post Created");
    });
  }
}
