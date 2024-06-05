// пайп для пошуку по title aбо author
import { Pipe, PipeTransform } from "@angular/core";
import { Post } from "../theme/interfaces";

@Pipe({ name: "searchPosts" })
export class searchPipe implements PipeTransform {
  // тут передаємо масив постів posts та рядок пошуку search
  transform(posts: Post[], search = ""): Post[] {
    // якщо поле пошуку пусте або містить лише пробіли то пайп просто повертає вхідний масив постів без змін.
    if (!search.trim()) {
      return posts;
    }
    // Якщо search не є пустим рядком, то відбувається фільтрація масиву posts.
    // Для кожного поста перевіряється, чи міститься в його заголовку або авторі рядок пошуку. 
    // Це робиться за допомогою методу toLowerCase(), який перетворює рядок у нижній регістр для зручності порівняння,
    // і методу includes(), який перевіряє, чи міститься вхідний рядок в рядку пошуку.
    return posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(search.toLowerCase());
      const authorMatch = post.author .toLowerCase().includes(search.toLowerCase());
      return titleMatch || authorMatch;
    });
  }
}
