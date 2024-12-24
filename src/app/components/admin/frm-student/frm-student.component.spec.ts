import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrmStudentComponent } from './frm-student.component';

describe('FrmStudentComponent', () => {
  let component: FrmStudentComponent;
  let fixture: ComponentFixture<FrmStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FrmStudentComponent]
    });
    fixture = TestBed.createComponent(FrmStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
