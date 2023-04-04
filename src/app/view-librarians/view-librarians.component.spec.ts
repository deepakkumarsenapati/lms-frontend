import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLibrariansComponent } from './view-librarians.component';

describe('ViewLibrariansComponent', () => {
  let component: ViewLibrariansComponent;
  let fixture: ComponentFixture<ViewLibrariansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLibrariansComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLibrariansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
