import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}

  registerStudent(student: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/students', student);
  }
}
