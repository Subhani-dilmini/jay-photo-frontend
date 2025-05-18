import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  baseUrl = 'http://localhost:8080/api/meetings';   

  constructor(private http: HttpClient) { }

  getPendingMeetingCount(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/count/pending', {headers});
  }

  getPendingMeetingCountByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/getCountByUser/' + id, {headers});
  }

  getPendingMeetings(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/pending', {headers});
  }

  getPendingMeetingsByUser(id: number): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/getByUser/' + id, {headers});
  }

  getConfirmedMeetingCount(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/count/confirmed', {headers});
  }

  getConfirmedMeetings(): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.baseUrl + '/confirmed', {headers});
  }

  changeMeetingStatus(id: number, status: string): Observable<any> {
    let headers = new HttpHeaders();
    let params = new HttpParams().set('status', status);
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.baseUrl + '/' + id + '/changeStatus', {}, {headers: headers, params: params});
  }

  addMeeting(meeting: any): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.baseUrl, meeting, {headers, responseType: 'text' as 'json' });
  }

}
