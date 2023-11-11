import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DeleteButtonRenderer } from '../renderer/DeleteButtonRenderer';
import { EditButtonRenderer } from '../renderer/EditButtonRenderer';
import { AppServiceService } from '../service/app-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Book } from '../models/book.interface';

@Component({
  selector: 'app-view-books',
  templateUrl: './view-books.component.html',
  styleUrls: ['./view-books.component.scss'],
})
export class ViewBooksComponent implements OnInit {
  columnDefs: ColDef[] = [
    { field: 'title' },
    { field: 'author' },
    { field: 'category', flex: 1.5 },
    { field: 'totalCopies', flex: 1.2 },
    { field: 'availableCopies' },
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

  bookForm!: FormGroup;
  spinnerOn: boolean = false;
  showToast: boolean = false;
  heading: string = 'Congratulations';
  body: string = 'You have updated one student successfully!';

  constructor(private appService: AppServiceService) {
    // this.rowData$ = this.appService.getStudent();
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      bookId: new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.minLength(4)]),
      author: new FormControl('', [Validators.required, Validators.minLength(4)]),
      category: new FormControl('', [Validators.required]),
      totalCopies: new FormControl('', [Validators.required]),
      availableCopies: new FormControl(''),
    });
    // this.gridApi.showLoadingOverlay();
    this.appService.getBooks().subscribe((resp) => {
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
    this.appService.deleteBook(event.rowData).subscribe((resp) => {
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
    this.markAllAsTouched(this.bookForm);
  }

  updateForm(data: Book) {
    this.bookForm.patchValue({
      bookId: data.bookId,
      title: data.title,
      author: data.author,
      category: data.category,
      totalCopies: data.totalCopies,
      availableCopies: data.availableCopies,
    });
  }

  public markAllAsTouched(formGroup: FormGroup): void {
    (Object as any).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();
    });
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get category() {
    return this.bookForm.get('category');
  }

  get totalCopies() {
    return this.bookForm.get('totalCopies');
  }

  onSubmit() {
    this.spinnerOn = true;
    let book: Book = this.bookForm.value;
    book.availableCopies = book.totalCopies;
    this.appService.updateBook(book).subscribe((resp) => {
      this.showToast = true;
      setTimeout(() => {
        this.spinnerOn = false;
        this.showToast = false;
      }, 2000);
      console.log(resp);
      this.closeModal();
    });
    this.bookForm.reset();
  }

  closeModal() {
    document?.getElementById('closeModal')?.click();
  }
}
