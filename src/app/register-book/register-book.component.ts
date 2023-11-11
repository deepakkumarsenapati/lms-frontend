import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { Book } from '../models/book.interface';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.scss'],
})
export class RegisterBookComponent implements OnInit {
  bookForm!: FormGroup;
  spinnerOn: boolean = false;
  showToast: boolean = false;
  heading: string = 'Congratulations';
  body: string = 'You have registered one student successfully!';
  constructor(private service: AppServiceService) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      author: new FormControl('', [Validators.required, Validators.minLength(4)]),
      category: new FormControl('', [Validators.required]),
      totalCopies: new FormControl('', [Validators.required]),
      availableCopies: new FormControl(''),
    });
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get category() {
    return this.bookForm.get('category');
  }

  get totalCopies() {
    return this.bookForm.get('totalCopies');
  }

  onSubmit() {
    this.spinnerOn = true;
    let book: Book = this.bookForm.value;
    book.availableCopies = book.totalCopies;
    this.service.registerBook(book).subscribe((resp) => {
      this.showToast = true;
      setTimeout(() => {
        this.spinnerOn = false;
        this.showToast = false;
      }, 2000);
      console.log(resp);
    });
    this.bookForm.reset();
  }
}
