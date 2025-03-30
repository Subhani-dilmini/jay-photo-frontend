import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedSubject = new BehaviorSubject<boolean>(false);
  isLogged = this.isLoggedSubject.asObservable();
  errorMessage: string = '';

  baseUrl = 'http://localhost:8080/auth/';
  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    let params = new HttpParams()
      .set('email', username)
      .set('password', password);

    return this.http.post<any>(this.baseUrl + 'login', null, { params, responseType: 'text' as 'json' });
  }

  /*
  signUp(Fname: string, Lname: string, Phone: string, Eaddress: string, address: string, Username: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { Fname, Lname, Phone, Eaddress, address, Username, Password };
    return this.http.post<any>(this.baseUrl + 'register', body, { headers });
  }*/

    signUp(Fname: string, Lname: string, Phone: string, Eaddress: string, address: string, Username: string, Password: string): Observable<any> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      const body = { Fname, Lname, Phone, Eaddress, address, Username, Password };
    
      return this.http.post<any>(this.baseUrl + 'register', body, { headers }).pipe(
        map((response: any) => {
          
          return response; // Return the response if successful
        }),
        catchError((error: any) => {
          // Log the error to understand the issue
          console.error('Error in sign-up:', error);
          // Handle error gracefully
          if (error.status === 0) {
            this.errorMessage = 'Cannot connect to the backend. Please try again later.';
          } else {
            this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
          }
          return throwError(error); // Return the error to propagate it further
        })
      );
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
