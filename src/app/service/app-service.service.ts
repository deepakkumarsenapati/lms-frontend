import { Student } from './../models/student.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppServiceService {
  constructor(private http: HttpClient) {}

  registerStudent(student: Student): Observable<Student> {
    return this.http.post<Student>(`${environment.appUrl}${'/api/students'}`, student);
  }

  getStudent(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.appUrl}${'/api/students'}`);
  }

  deleteStudent(student: Student): Observable<any> {
    return this.http.delete<any>(`${environment.appUrl}${'/api/students/'}${student.studentId}`);
  }

  updateStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${environment.appUrl}${'/api/students/'}${student.studentId}`, student);
  }
}
