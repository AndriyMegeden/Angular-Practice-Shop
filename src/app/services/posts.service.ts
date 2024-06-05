import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { FbCreateResponse, Post } from "../theme/interfaces";
import { environment } from "src/environments/environment";

@Injectable({ providedIn: "root" })
export class PostsService {
  constructor(private http: HttpClient) {}

  // Ця функція create відправляє HTTP POST-запит для створення нового поста на сервері.
  create(post: Post): Observable<Post> {
    return this.http
      .post<FbCreateResponse>(`${environment.fireBaseDBurl}/posts.json`, post)
      .pipe(
        // відбувається обробка відповіді сервера за допомогою оператора map.
        // Цей оператор застосовується до результату запиту, який є об'єктом типу FbCreateResponse.
        map((response: FbCreateResponse) => {
          return {
            // У функції map створюється новий об'єкт поста, що буде повернуто як результат функції create.
            // Цей новий об'єкт включає всі властивості переданого об'єкта post.
            // Крім того, до цього об'єкта додається нове поле id, яке отримує значення з відповіді сервера у властивості name.
            ...post,
            id: response.name,
            // Для поля date також відбувається обробка. Якщо вихідна дата поста вказана (post.date не є undefined),
            // тоді вона конвертується в об'єкт Date і записується до нового поста. В іншому випадку, поле date залишається undefined.
            date: post.date ? new Date(post.date) : undefined,
          };
        })
      );
  }

  // Ця функція getAll() отримує всі пости з бази даних за допомогою HTTP GET запиту до адреси ${environment.fireBaseDBurl}/posts.json.
  getAll(): Observable<Post[]> {
    return this.http.get(`${environment.fireBaseDBurl}/posts.json`).pipe(
      // Оператор map використовується для перетворення даних отриманої відповіді.
      // У цьому випадку, ми отримуємо об'єкт з ключами постів і  (дані постів), тому ми вказуємо response: { [key: string]: any },
      // що означає, що об'єкт може містити будь-яку кількість ключів, і будь-які значення.
      map((response: { [key: string]: any }) => {
        // повертає масив ключів з об'єкта response. Ми перебираємо цей масив ключів, використовуючи метод map, для створення нового масиву.
        return Object.keys(response).map((key) => ({
          // використовується для отримання даних поста за ключем. За допомогою оператора розширення ... ми копіюємо всі поля знайденого поста.
          ...response[key],
          // Додаємо поле id до копії поста із значенням, яке відповідає ключеві поста.
          id: key,
          // Конвертуємо стрічкове значення дати з об'єкта поста в об'єкт JavaScript Date, і додаємо його як значення поля date.
          date: new Date(response[key].date),
        }));
      })
    );
  }
  // цей код дозволяє отримати пост з сервера за його унікальним ID
  getById(id: string): Observable<Post> {
    return this.http
      .get<Post>(`${environment.fireBaseDBurl}/posts/${id}.json`)
      .pipe(
        map((post: Post) => {
          return {
            ...post,
            id,
            date: post.date ? new Date(post.date) : undefined,
          };
        })
      );
  }

  // Цей код призначений для видалення поста
  // Він використовує об'єкт http для виконання HTTP DELETE-запиту на сервер.
  // формує URL для видалення конкретного поста з використанням ідентифікатора id та URL-адреси
  // Повертає Observable типу void,
  remove(id: string): Observable<void> {
    return this.http.delete<void>(
      `${environment.fireBaseDBurl}/posts/${id}.json`
    );
  }
  // тут ми оновлюємо пост який ми відкрили
  // patch дозволяє частково оновлювати дані
  update(post: Post): Observable<Post> {
    return this.http.patch<Post>(`${environment.fireBaseDBurl}/posts/${post.id}.json`, post);
  }
}
