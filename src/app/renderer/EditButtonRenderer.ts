import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'delete-button-enderer',
  template: `<span>
    <button type="button" class="btn btn-primary" (click)="buttonClicked()">
      Edit
    </button>
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

  buttonClicked() {
    alert('Edit Button Clicked!');
  }
}
