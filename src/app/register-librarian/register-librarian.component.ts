import { Component, OnInit } from '@angular/core';
import { Librarian } from '../models/librarian.interface';
import { AppServiceService } from '../service/app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-librarian',
  templateUrl: './register-librarian.component.html',
  styleUrls: ['./register-librarian.component.scss'],
})
export class RegisterLibrarianComponent implements OnInit {
  profileForm!: FormGroup;
  spinnerOn: boolean = false;
  showToast: boolean = false;
  heading: string = 'Congratulations';
  body: string = 'You have registered one student successfully!';
  constructor(private service: AppServiceService) {}

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      dateOfBirth: new FormControl('', Validators.required),
    });
  }

  get firstName() {
    return this.profileForm.get('firstName');
  }

  get lastName() {
    return this.profileForm.get('lastName');
  }

  get address() {
    return this.profileForm.get('address');
  }

  get email() {
    return this.profileForm.get('email');
  }

  get gender() {
    return this.profileForm.get('gender');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get dateOfBirth() {
    return this.profileForm.get('dateOfBirth');
  }

  onSubmit() {
    this.spinnerOn = true;
    let librarian: Librarian = this.profileForm.value;
    librarian.dateOfBirth = new Date(librarian.dateOfBirth);
    this.service.registerLibrarian(librarian).subscribe((resp) => {
      this.showToast = true;
      setTimeout(() => {
        this.spinnerOn = false;
        this.showToast = false;
      }, 2000);
      console.log(resp);
    });
    this.profileForm.reset();
  }
}
