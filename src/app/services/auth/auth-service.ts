import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, Observable, of, throwError } from 'rxjs';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {

  }

  login(user: User) {
    this.userSubject.next({
      userName: user.userName,
      password: user.password,
      isLoggedIn: true,
    });
  }

  logout() {
    this.userSubject.next(null);
  }

  apiCallOne() {
    return new Observable(observer => {
      observer.next({ data: 'api1 response' });
      observer.complete();
    });
  }

  apiCallTwo() {
    return new Observable(observer => {
      observer.next({ data: 'api2 response' });
      observer.complete();
    })
  }

  multipleApiCalls() {

    forkJoin({
      api1: this.apiCallOne(),
      api2: this.apiCallTwo(),
      users: this.http.get('/api/users').pipe(
        catchError(error => {
          console.error('Users API failed', error);
          return of([]); // return empty array on failure
        })
      ),

    }).pipe(
      // handle response
      catchError(err => {
        console.error(err);
        return throwError(() => err);
      })
    ).subscribe((response: any) => {
      console.log(response.api1);
      console.log(response.api2);
    });
  }


}
