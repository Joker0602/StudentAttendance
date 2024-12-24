import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { attendanceModel } from 'src/app/models/attendance';
import { classModel } from 'src/app/models/class';
import { studentModel } from 'src/app/models/student';
import { attendanceService } from 'src/app/service/attendance.service';
import { classService } from 'src/app/service/class.service';
import { studentService } from 'src/app/service/student.service';
import { empty } from 'rxjs';
import { TemplateBindingParseResult } from '@angular/compiler';

export interface TempclassList {
  srNumber: number;
  name: string;
  id: number;
}
@Component({
  selector: 'app-frm-class',
  templateUrl: './frm-class.component.html',
  styleUrls: ['./frm-class.component.scss'],
})
export class FrmClassComponent {
  classForm = new FormGroup({
    name: new FormControl(),
  });
  btnSubmit = 'Save';
  class: classModel = {} as classModel;

  displayedColumns: string[] = ['srNumber', 'Name', 'Edit', 'Delete'];
  dataSource: MatTableDataSource<TempclassList>;

  studentList: studentModel[] = [];
  attendanceList: attendanceModel[] = [];

  classList: classModel[] = [];
  tempClassList: TempclassList[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  studentWithAttendance: any[] = [];

  startDate: string | any; // Date for the start range
  endDate: string | any; // Date for the end range
  textFilterValue: string = '';

  constructor(
    private studentService: studentService,
    private attendanceService: attendanceService,
    private classService: classService
  ) {
    let srNumber = 1;

    this.classList = this.classService.showAll();
    this.classList.forEach((res) => {
      this.tempClassList.push({
        srNumber: srNumber,
        name: res.name,
        id: res.Id,
      });
      srNumber++;
    });
    this.dataSource = new MatTableDataSource(this.tempClassList);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  save() {
    const data: classModel = {} as classModel;
    data.name = this.classForm.get('name')?.value!;
    data.Id = this.classService.getMaxId();

    if (data.name != '' || data.name != null) {
      if (data.Id > 0) {
        const res = this.classService.save(data);
        if (res) {
          alert('Record Saved Successfully !');
          this.getAll()
          // Push the newly saved class to the tempClassList
          // let newClass = {
          //   srNumber: this.tempClassList.length + 1, // Incrementing serial number
          //   name: data.name,
          //   id: data.Id,
          // };

          // // Push to the array
          // this.tempClassList.push(newClass);

          // // Now update the dataSource to reflect the new list
          // this.dataSource = new MatTableDataSource(this.tempClassList);
        }
      }
    } else {
      alert('Please fill Name !');
    }
  }

  update() {
    if (this.class.Id > 0) {
      this.classService.updateStudent(this.class);
      alert('Record Updated Successfully');
      this.getAll()
      this.btnSubmit = 'Save';
    }
  }

  getAll() {
    let srNumber = 1;
    this.tempClassList=[]
    this.classList = this.classService.showAll();
    this.classList.forEach((res) => {
      this.tempClassList.push({
        srNumber: srNumber,
        name: res.name,
        id: res.Id,
      });
      srNumber++;
    });
    this.dataSource = new MatTableDataSource(this.tempClassList);
  }

  // clearDataSource() {
  //   this.dataSource = new MatTableDataSource(this.tempClassList);
  // }

  edit(id: number) {
    const c = this.classService.getById(id);
    this.class.Id = c.Id;
    this.class.name = c.name;
    this.btnSubmit = 'Update';
  }

  delete(id: number) {
    if (confirm('Do You Want To Delete ?')) {

      this.classService.delete(id);
      this.getAll()
      this.btnSubmit = 'Save';
    }
  }

  clear() {
    this.btnSubmit = 'Save';
  }

  // Method for text and date range filtering
  applyFilter() {
    const textFilterValue = this.textFilterValue.trim().toLowerCase();

    this.dataSource.filter = textFilterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
