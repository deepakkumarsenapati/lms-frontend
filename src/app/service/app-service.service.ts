import { Student } from './../models/student.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Librarian } from '../models/librarian.interface';

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

  registerLibrarian(librarian: Librarian): Observable<Librarian> {
    return this.http.post<Librarian>(`${environment.appUrl}${'/api/librarians'}`, librarian);
  }

  getLibrarian(): Observable<Librarian[]> {
    return this.http.get<Librarian[]>(`${environment.appUrl}${'/api/librarians'}`);
  }

  deleteLibrarian(librarian: Librarian): Observable<any> {
    return this.http.delete<any>(`${environment.appUrl}${'/api/librarians/'}${librarian.librarianId}`);
  }

  updateLibrarian(librarian: Librarian): Observable<Librarian> {
    return this.http.put<Librarian>(`${environment.appUrl}${'/api/librarians/'}${librarian.librarianId}`, librarian);
  }
}
