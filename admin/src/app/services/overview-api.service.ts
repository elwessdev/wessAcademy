import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverviewApiService {
  private apiUrl = 'http://127.0.0.1:8000/api/dashboard';

  constructor(private http: HttpClient) {}

  getTotal(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_total`);
  }

  getMajorStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_major_statistics`);
  }

  getCourseEnrollment(): Observable<any> {
    return this.http.get(`${this.apiUrl}/get_course_enrollment`);
  }
}
