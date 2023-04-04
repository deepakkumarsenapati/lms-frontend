import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';

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
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      address: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      phoneNumber: new FormControl(''),
      dateOfBirth: new FormControl(''),
    });
  }

  onSubmit() {
    let student = this.profileForm.value;
    student.dateOfBirth = new Date(student.dateOfBirth);
    this.service.registerStudent(student).subscribe((resp) => {
      console.log(resp);
    });
    //console.log(this.profileForm.value);
    alert('form submitted');
  }
}
