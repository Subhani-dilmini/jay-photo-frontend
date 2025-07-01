import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  baseUrl = 'http://localhost:8080/api/sessions';

  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private router: Router
  ) { }

  addSession(data: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, data, {headers, responseType: 'text' as 'json'});
  }

  getUpcomingSessionCountByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/upcomingCountByUser/' + id, {headers});
  }

  getUpcomingSessionsByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/upcomingByUser/' + id, {headers});
  }

  getPastSessionCountByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/pastCountByUser/' + id, {headers});
  }

  getPastSessionsByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/pastByUser/' + id, {headers});
  }

  getPendingSessionCount(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/pendingCount', {headers});
  }

  getPendingSessions(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/pending', {headers});
  }

  getConfirmedMeetingCount(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/confirmedCount', {headers});
  }

  getConfirmedSessions(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/confirmed', {headers});
  }

  changeSessionStatus(id: number, status: string): Observable<any> {
      let headers = new HttpHeaders();
      let params = new HttpParams().set('status', status);
      headers.append('Content-Type', 'application/json');
      return this.http.put(this.baseUrl + '/' + id + '/changeSessionStatus', {}, {headers: headers, params: params});
  }
}
