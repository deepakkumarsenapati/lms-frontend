import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterStudentComponent } from './register-student/register-student.component';
import { RegisterBookComponent } from './register-book/register-book.component';
import { RegisterLibrarianComponent } from './register-librarian/register-librarian.component';
import { ViewBorrowingsComponent } from './view-borrowings/view-borrowings.component';
import { ViewLibrariansComponent } from './view-librarians/view-librarians.component';
import { ErrorComponent } from './error/error.component';
import { ViewStudentsComponent } from './view-students/view-students.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { SpinnerComponent } from './spinner/spinner.component';
import { ToastComponent } from './toast/toast.component';
import { ViewBooksComponent } from './view-books/view-books.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterStudentComponent,
    RegisterBookComponent,
    RegisterLibrarianComponent,
    ViewBorrowingsComponent,
    ViewLibrariansComponent,
    ErrorComponent,
    ViewStudentsComponent,
    SpinnerComponent,
    ToastComponent,
    ViewBooksComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, FormsModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
