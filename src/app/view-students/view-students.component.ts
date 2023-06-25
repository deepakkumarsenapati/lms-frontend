import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { AppServiceService } from '../service/app-service.service';
import { Student } from '../models/student.interface';
import { DeleteButtonRenderer } from '../renderer/DeleteButtonRenderer';
import { EditButtonRenderer } from '../renderer/EditButtonRenderer';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';

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

  profileForm!: FormGroup;
  spinnerOn: boolean = false;
  showToast: boolean = false;
  heading: string = 'Congratulations';
  body: string = 'You have updated one student successfully!';

  constructor(private appService: AppServiceService, private service: AppServiceService) {
    this.rowData$ = this.appService.getStudent();
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      studentId: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      address: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      dateOfBirth: new FormControl('', Validators.required),
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
  }

  deleteClicked(event: any) {
    this.spinnerOn = true;
    console.log(event);
    //const selectedData = this.gridApi.getSelectedRows();
    let selectedData = [];
    selectedData.push(event.rowData);
    const res = this.gridApi.applyTransaction({ remove: selectedData })!;
    this.service.deleteStudent(event.rowData).subscribe((resp) => {
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

  updateForm(data: Student) {
    this.profileForm.patchValue({
      studentId: data.studentId,
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
    let student: Student = this.profileForm.value;
    student.dateOfBirth = new Date(student.dateOfBirth);
    this.service.updateStudent(student).subscribe((resp) => {
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
