import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  baseUrl = 'http://localhost:8080/api/packages/';   

  constructor(private http: HttpClient) { }

  getPackages(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl, {headers});
  }
}




