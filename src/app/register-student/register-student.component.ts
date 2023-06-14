import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import { Student } from '../models/student.interface';

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.scss'],
})
export class RegisterStudentComponent implements OnInit {
  profileForm!: FormGroup;
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
    let student: Student = this.profileForm.value;
    student.dateOfBirth = new Date(student.dateOfBirth);
    this.service.registerStudent(student).subscribe((resp) => {
      console.log(resp);
    });
    this.profileForm.reset();
    alert('form submitted');
  }
}
