import { Component, OnInit } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { ActivatedRoute, Params } from "@angular/router";
import { Observable, switchMap } from "rxjs";
import { Post } from "../theme/interfaces";

@Component({
  selector: "app-post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.scss"],
})
export class PostPageComponent implements OnInit {
  post$!: Observable<Post>;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.post$ = this.route.params.pipe(switchMap((params: Params)=> {
      return this.postsService.getById(params ['id'])
    }));
  }
}
