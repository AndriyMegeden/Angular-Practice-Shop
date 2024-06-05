import { Component, OnInit } from "@angular/core";
import { PostsService } from "../services/posts.service";
import { Observable, mapTo, range, repeat } from "rxjs";
import { Post } from "../theme/interfaces";

@Component({
  selector: "app-home-page",
  templateUrl: "./home-page.component.html",
  styleUrls: ["./home-page.component.scss"],
})
export class HomePageComponent implements OnInit {
  // AsyncPipe перевага використання полягає в уникненні необхідності вручну підписуватися на Observable
  // або Promise у компоненті та вручну відписуватись від нього. AsyncPipe робить це автоматично
  posts$!: Observable<Post[]>;

  constructor(private postsService: PostsService) {
   
  }

  ngOnInit() {
    // отримуємо всі пости з бази даних за допомогою сервісу
    this.posts$ = this.postsService.getAll();
  }


 
}


