import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() showToast: boolean = false;
  @Input() heading: string = '';
  @Input() body: string = '';

  constructor() {}

  ngOnInit(): void {}
}
