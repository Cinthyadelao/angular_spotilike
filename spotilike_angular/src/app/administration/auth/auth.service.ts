import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //para proyecto express
  //private apiUrl = 'http://localhost:5005/api/users';

  //para proyecto asp.net
  private apiUrl = 'http://localhost:7286';


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