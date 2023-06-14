import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'delete-button-enderer',
  template: `<span>
    <button
      type="button"
      class="btn btn-danger"
      (click)="buttonClicked($event)"
    >
      Delete
    </button>
  </span>`,
})
export class DeleteButtonRenderer implements ICellRendererAngularComp {
  params!: any;

  agInit(params: ICellRendererParams<any, any, any>): void {
    this.params = params;
    console.log(params);
  }
  refresh(params: ICellRendererParams<any, any, any>): boolean {
    console.log(params);
    return true;
  }

  buttonClicked(event: any) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: event,
        rowData: this.params.node.data,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
