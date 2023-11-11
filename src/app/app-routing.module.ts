import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { ViewBorrowingsComponent } from './view-borrowings/view-borrowings.component';
import { ViewLibrariansComponent } from './view-librarians/view-librarians.component';
import { RegisterLibrarianComponent } from './register-librarian/register-librarian.component';

import { ViewStudentsComponent } from './view-students/view-students.component';
import { ErrorComponent } from './error/error.component';
import { ViewBooksComponent } from './view-books/view-books.component';

const routes: Routes = [
  { path: 'register-student', component: RegisterStudentComponent },
  { path: 'register-book', component: RegisterBookComponent },
  { path: 'register-librarian', component: RegisterLibrarianComponent },
  { path: 'view-borrowings', component: ViewBorrowingsComponent },
  { path: 'view-librarians', component: ViewLibrariansComponent },
  { path: 'view-students', component: ViewStudentsComponent },
  { path: 'view-books', component: ViewBooksComponent },
  { path: '', redirectTo: '/view-borrowings', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: ErrorComponent }, // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
