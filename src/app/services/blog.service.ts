import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  baseUrl = 'http://localhost:8080/api/blog/';

  constructor(private http: HttpClient, private router: Router) { }

  getBlogs(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'blogs', {headers});
  }

  getBlog(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'blogs/'+ id, {headers});
  }
}
