import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PostsService } from "../services/posts.service";
import { switchMap } from "rxjs";
import { Post } from "../theme/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"],
})
export class EditPageComponent implements OnInit {
  public form!: FormGroup;
  public post!: Post;
  public submitted = false;

  // за допомогою маршруту до компонента, ActivatedRoute дозволяє вам отримати доступ до URL-параметрів,
  // дані маршруту та іншої інформації про поточний маршрут.
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted = true;

    this.postsService
      .update({
        ...this.post,
        id: this.post.id,
        title: this.form.value.title,
        text: this.form.value.text,
      })
      .subscribe(() => {
        this.submitted = false;
      });
  }

  // Коли вхідним потоком даних є Observable, який видає значення, що також є Observable
  // switchMap() може приймати значення з цього внутрішнього Observable і замінювати його на новий Observable.
  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params["id"]);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required),
        });
      });
  }
}
