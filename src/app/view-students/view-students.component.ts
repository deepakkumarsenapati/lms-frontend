import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AppServiceService } from '../service/app-service.service';
import { Student } from '../models/student.interface';
import { DeleteButtonRenderer } from '../renderer/DeleteButtonRenderer';
import { EditButtonRenderer } from '../renderer/EditButtonRenderer';

@Component({
  selector: 'app-view-students',
  templateUrl: './view-students.component.html',
  styleUrls: ['./view-students.component.scss'],
})
export class ViewStudentsComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email', flex: 1.5 },
    { field: 'phoneNumber', flex: 1.2 },
    { field: 'gender' },
    { field: 'address' },
    { field: 'dateOfBirth' },
    {
      field: '',
      cellRenderer: DeleteButtonRenderer,
      editable: false,
      filter: false,
      resizable: false,
      sortable: false,
      flex: 0.8,
      cellRendererParams: {
        onClick: this.deleteClicked.bind(this),
        label: 'Click 1',
      },
    },
    {
      field: '',
      cellRenderer: EditButtonRenderer,
      editable: false,
      filter: false,
      resizable: false,
      sortable: false,
      flex: 0.8,
    },
  ];

  public rowData$!: Observable<Student[]>;

  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    filter: true,
    resizable: true,
  };

  private gridApi!: GridApi;

  public rowSelection: 'single' | 'multiple' = 'single';

  constructor(private appService: AppServiceService) {
    this.rowData$ = this.appService.getStudent();
  }

  ngOnInit(): void {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  deleteClicked() {
    const selectedData = this.gridApi.getSelectedRows();
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    console.log(res);
  }
}
