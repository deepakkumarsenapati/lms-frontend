import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { DeleteButtonRenderer } from '../renderer/DeleteButtonRenderer';
import { EditButtonRenderer } from '../renderer/EditButtonRenderer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppServiceService } from '../service/app-service.service';
import * as moment from 'moment';
import { Librarian } from '../models/librarian.interface';

@Component({
  selector: 'app-view-librarians',
  templateUrl: './view-librarians.component.html',
  styleUrls: ['./view-librarians.component.scss'],
})
export class ViewLibrariansComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'firstName' },
    { field: 'lastName' },
    { field: 'email', flex: 1.5 },
    { field: 'phoneNumber', flex: 1.2 },
    { field: 'gender' },
    { field: 'address' },
    { field: 'dateOfBirth', valueFormatter: this.formatDate },
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
      cellRendererParams: {
        onClick: this.editClicked.bind(this),
        label: 'Click 2',
      },
    },
  ];

  // public rowData$!: Observable<Student[]>;
  rowData: any;

  public defaultColDef: ColDef = {
    editable: true,
    sortable: true,
    flex: 1,
    filter: true,
    resizable: true,
  };

  private gridApi!: GridApi;

  public rowSelection: 'single' | 'multiple' = 'single';

  public overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait while your rows are loading!!!</span>';

  profileForm!: FormGroup;
  spinnerOn: boolean = false;
  showToast: boolean = false;
  heading: string = 'Congratulations';
  body: string = 'You have updated one student successfully!';

  constructor(private appService: AppServiceService) {
    // this.rowData$ = this.appService.getStudent();
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      librarianId: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      dateOfBirth: new FormControl('', Validators.required),
    });
    // this.gridApi.showLoadingOverlay();
    this.appService.getLibrarian().subscribe((resp) => {
      this.rowData = resp;

      // this.gridApi.hideOverlay();
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.showLoadingOverlay();
  }

  deleteClicked(event: any) {
    this.spinnerOn = true;
    console.log(event);
    //const selectedData = this.gridApi.getSelectedRows();
    let selectedData = [];
    selectedData.push(event.rowData);
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    this.appService.deleteLibrarian(event.rowData).subscribe((resp) => {
      setTimeout(() => {
        this.spinnerOn = false;
      });
    });
    console.log(res);
  }

  editClicked(event: any) {
    document?.getElementById('openModal')?.click();
    console.log(event.rowData);
    this.updateForm(event.rowData);
    this.markAllAsTouched(this.profileForm);
  }

  updateForm(data: Librarian) {
    this.profileForm.patchValue({
      librarianId: data.librarianId,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      email: data.email,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      dateOfBirth: moment(data.dateOfBirth).format('YYYY-MM-DD'),
    });
  }

  public markAllAsTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
    });
  }

  formatDate(param: ValueFormatterParams) {
    return moment(param.value).format('DD-MM-YYYY');
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
    this.appService.updateLibrarian(librarian).subscribe((resp) => {
      this.showToast = true;
      setTimeout(() => {
        this.spinnerOn = false;
        this.showToast = false;
      }, 2000);
      console.log(resp);
      this.closeModal();
    });
    this.profileForm.reset();
  }

  closeModal() {
    document?.getElementById('closeModal')?.click();
  }
}
