import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError } from 'rxjs/operators';
import { User, UsersServerResponse } from '@components/6.1httpClient-send-request/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<UsersServerResponse>('/assets/users.json').pipe(
      map(data => {
        const userList = data['userList'];
        return userList.map((user: User | any) => {
          if (user.userName && user.userAge) {
            return {name: user.userName, age: user.userAge};
          } else {
            return user;
          }
        });
      }),
      catchError(err => {
        return _throw(err);
      })
    );
  }

  public getFactorial(num: number): Observable<number> {
    const url = 'api/getFactorial.php';
    const params = new HttpParams().set('number', String(num));
    return this.http.get<number>(url, {params});
  }

  public postData(user: User): Observable<User> {
    const body = {name: user.name, age: user.age};
    const headers = new HttpHeaders().set('Authorization', 'my-aut-token')
    return this.http.post<User>('api/postUser.php', user, {headers: headers});
  }
}
