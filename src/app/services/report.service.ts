// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // Provided at root level for standalone components
})
export class ReportService {
  private baseUrl = 'http://localhost:8080/api/reports'; // Adjust to your Spring Boot port

  constructor(private http: HttpClient) {}

  // Fetch meeting status count for pie chart
  getMeetingStatusCount(): Observable<{ status: string; count: number }[]> {
    return this.http.get<{ status: string; count: number }[]>(`${this.baseUrl}/meeting-status-count`).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch session summary for bar graph and table
  getSessionSummary(): Observable<{ date: string; amount: number; packageName: string; place: string; paymentStatus: string; sessionStatus: string }[]> {
    return this.http.get<{ date: string; amount: number; packageName: string; place: string; paymentStatus: string; sessionStatus: string }[]>(`${this.baseUrl}/session-summary`).pipe(
      catchError(this.handleError)
    );
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
