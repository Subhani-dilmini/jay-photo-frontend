import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedSubject.asObservable();

  baseUrl = 'http://localhost:8080/auth/';
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('email', username)
      .set('password', password);

    return this.http.post<any>(this.baseUrl + 'login', null, { params, responseType: 'text' as 'json' });
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedSubject.next(false);
    this.router.navigate(['login']);
  }

  setLogged() {
    this.isLoggedSubject.next(true);
  }

  
}
