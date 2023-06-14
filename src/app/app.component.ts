import { Component, OnInit } from '@angular/core';
import { Link } from './models/link';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LMS';
  links: Array<Link> = [];
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.links = [
      {
        routerLink: '/register-student',
        label: 'Register Student',
      },
      {
        routerLink: '/view-students',
        label: 'View Student',
      },
      {
        routerLink: '/register-librarian',
        label: 'Register Librarians',
      },
      {
        routerLink: '/view-librarians',
        label: 'View Librarians',
      },
      {
        routerLink: '/view-borrowings',
        label: 'View Borrowings',
      },
      {
        routerLink: '/register-book',
        label: 'Register Book',
      },
      {
        routerLink: '/',
        label: 'View Books',
      },
    ];
  }
}
