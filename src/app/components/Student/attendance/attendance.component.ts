import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { attendanceModel } from 'src/app/models/attendance';
import { studentModel } from 'src/app/models/student';
import { userModel } from 'src/app/models/user';
import { attendanceService } from 'src/app/service/attendance.service';
import { studentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [DatePipe]
})
export class AttendanceComponent {
  private studentID=0
  currentDate: Date;
  monthDays: (number | null)[] = [];
  presentDates: string[] = [];
  attendanceList:attendanceModel[]=[]
  firstDayOfWeek: number = 0;
  student:studentModel={ } as studentModel;
  studentList:studentModel[]=[]
  LoggedUser:userModel={} as userModel
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  currentDay: Date = new Date();
  constructor(
    private attendanceService:attendanceService,
    private studentService:studentService
  ) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.studentList=this.studentService.showAll();
    const userData=localStorage.getItem('LoggedInUser');
    this.LoggedUser=JSON.parse(userData?.toString()!)


    this.student=Object(this.studentList.find(x=>x.UserId==this.LoggedUser.Id));
    console.log(this.student)
    this.generateCalendar();
    if(this.student.Id>0){
      this.attendanceList=this.attendanceService.getByStudentId(this.student.Id);
    }



  }

  ngAfterViewInit(){

    this.attendanceList.forEach((res) => {
      this.presentDates.push(res.date.toString())
    });
    console.log(this.presentDates)
    // for(var i=0; i<this.attendanceList.length; i++){
    //   const dates= this.attendanceList[i].date
    //   console.log(dates)
    //   this.presentDates.push(this.attendanceList[i].date)
    // }


  }

  // Generate the calendar for the current month
  generateCalendar(): void {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const numberOfDays = lastDay.getDate();

    this.firstDayOfWeek = firstDay.getDay();

    this.monthDays = [];

    for (let i = 0; i < this.firstDayOfWeek; i++) {
      this.monthDays.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= numberOfDays; i++) {
      this.monthDays.push(i);
    }
  }

  // Go to the previous month
  goToPrevMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.generateCalendar();
  }

  // Go to the next month
  goToNextMonth(): void {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.generateCalendar();
  }

  // Get the current month's name
  getMonthName(): string {
    return this.monthNames[this.currentDate.getMonth()];
  }

  // Get the current year
  getYear(): number {
    return this.currentDate.getFullYear();
  }



  currentDates(currentDay: any) {
    return (
      currentDay.getDate() +
      '/' +
      (currentDay.getMonth() + 1) +
      '/' +
      currentDay.getFullYear()
    );
  }

  selecteCurrentDate(day: any) {
    return (
      day +
      '/' +
      (this.currentDate.getMonth() + 1).toString() +
      '/' +
      this.currentDate.getFullYear().toString()
    );
  }





  // Function to compare if the date is greater than today
  isGreaterThanCurrentDate(day: any,months:any, year:any): boolean {
    const today = new Date();
    const currentDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    ); // Start of today (without time)
    const dateToCompare = new Date(year, months, day);

    return dateToCompare > currentDay;
  }

  // Function to compare if the date is before today
  isBeforeCurrentDate(day: any,months:any, year:any): boolean {
    const today = new Date();
    const currentDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const dateToCompare = new Date(year, months, day);

    return dateToCompare < currentDay; // If the date is before today
  }

  // Handle date click event
  onclickDate(day: any): void {

      if(confirm("Do You Want To Proceed ?")){
        const attendance:attendanceModel={} as attendanceModel
        attendance.Id=this.attendanceService.getMaxId();
        attendance.date= this.formatDate(day).toString() as any;
        attendance.status=true;
        attendance.studentId=this.student.Id;
        console.log(this.student.Id)
        if(attendance.studentId>0){
          this.attendanceService.save(attendance)

          alert('Attendance Saved Succefully!')
          this.generateCalendar();
          this.ngOnInit();
        }

      }

  }

  // Function to format a date as dd/MM/yyyy
  formatDate(day: any): string {
    const dayOfMonth = day < 10 ? '0' + day : day;
    const month = this.currentDate.getMonth() + 1; // getMonth() is zero-based
    const monthOfYear = month < 10 ? '0' + month : month;
    const year = this.currentDate.getFullYear();

    return `${dayOfMonth}/${monthOfYear}/${year}`; // Return date in dd/MM/yyyy format
  }

  // Function to check if the date is in the presentDates array
  isHighlightedDate(day: any): boolean {
    // this.presentDates.push(...this.attendanceList.map(res => res.date as any));
    // this.attendanceList.forEach((res)=>{
    //   console.log(res)
    //   this.presentDates.push((res.date).toString())
    // })

    const formattedDate = this.formatDate(day);

    return this.presentDates.includes(formattedDate); // Check if the formatted date is in the presentDates array
  }
}