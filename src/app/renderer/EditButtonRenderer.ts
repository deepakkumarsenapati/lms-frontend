import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'delete-button-enderer',
  template: `<span>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" (click)="buttonClicked()">Edit</button>
  </span>`,
})
export class EditButtonRenderer implements ICellRendererAngularComp {
  agInit(params: ICellRendererParams<any, any, any>): void {
    console.log(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    console.log(params);
    return true;
  }

  buttonClicked() {}
}
