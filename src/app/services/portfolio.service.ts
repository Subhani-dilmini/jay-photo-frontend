import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  baseUrl = 'http://localhost:8080/api/portfolio/';

  constructor(private http: HttpClient, private router: Router) { }

  getPortfolios(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'categories', {headers});
  }

  getAlbumsByCategoryId(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'categories/' + id + '/albums', {headers});
  }

  getAlbumById(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + 'albums/' + id , {headers});
  }

  addAlbum(album: any, categoryId: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + 'categories/'+ categoryId + '/albums' , album , {headers , responseType: 'text' as 'json' });
  }

  addCategory(category: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl + 'categories' , category , {headers , responseType: 'text' as 'json' });
  }
   
}
