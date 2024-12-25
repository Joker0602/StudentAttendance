import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { attendanceModel } from 'src/app/models/attendance';
import { classModel } from 'src/app/models/class';
import { studentModel } from 'src/app/models/student';
import { attendanceService } from 'src/app/service/attendance.service';
import { classService } from 'src/app/service/class.service';
import { studentService } from 'src/app/service/student.service';
export interface studentAttendance {
  studentId: string;
  Name: string;
  Contact: string;
  Address:string,
  srNumber: number;
  classId: number;
}

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  providers:[DatePipe]
})
export class StudentListComponent {
  displayedColumns: string[] = [
    'srNumber',
    'Name',
    'Contact',
    'ClassID',
    'Address',

  ];
  dataSource: MatTableDataSource<studentAttendance>;

  studentList: studentModel[] = [];
  attendanceList: attendanceModel[] = [];
  studentAttendanceList: studentAttendance[] = [];
  tempStudentAttendanceList:studentAttendance[]=[];
  classList: classModel[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  studentWithAttendance: any[] = [];

  startDate: string | any; // Date for the start range
  endDate: string | any; // Date for the end range
  textFilterValue: string = '';

  constructor(
    private studentService: studentService,
    private attendanceService: attendanceService,
    private classService: classService,
    private datePipe: DatePipe
  ) {
    let srNumber = 1;
    const student = this.studentService.showAll();
    this.studentList = student;
    this.attendanceList = this.attendanceService.showAll();

    this.studentList.forEach((res) => {
      for (let i  = 0; i < this.attendanceList.length; i++) {
        if(res.Id==this.attendanceList[i].studentId)
          {
            this.studentAttendanceList.push({
            srNumber: srNumber, // Add the serial number here
            studentId: res.Id.toString(),
            Name: res.Name,
            Contact: res.Contact,
            Address: res.Address,
            classId: res.ClassID,
          });
          srNumber++; // Increment the serial number for the next item
        }
      }
    });
    this.classList = this.classService.showAll();
    console.log(this.studentAttendanceList)
    this.dataSource = new MatTableDataSource(this.studentAttendanceList);
  }
  ngOnInit() {

    this.tempStudentAttendanceList=this.studentAttendanceList
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
