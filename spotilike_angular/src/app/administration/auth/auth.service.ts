import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5005/api/users';
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  registerUser(userPayload: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, userPayload);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  getAuthToken(): Observable<boolean> {
    return of(true);
  }
}



// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:5005/api/users';
//   private loggedIn = new BehaviorSubject<boolean>(false);

//   get isLoggedIn() {
//     return this.loggedIn.asObservable();
//   }

//   constructor(private http: HttpClient) { }

//   // loginUser(email: string, password: string): Observable<User> {
//   //   const loginData = { email, password };
//   //   return this.http.post<any>(`${this.apiUrl}/login`, loginData);
//   // }

//   registerUser(userPayload: any): Observable<User> {
//     return this.http.post<any>(`${this.apiUrl}/register`, userPayload);
//   }

//   login(email: string, password: string): Observable<any> {
//     return this.http.post(`${this.apiUrl}/login`, { email, password })
//       .pipe(
//         tap((response: any) => {
//           if (response.token) {
//             localStorage.setItem('token', response.token);
//             this.loggedIn.next(true);
//           }
//         })
//       );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     this.loggedIn.next(false);
//   }
// }
