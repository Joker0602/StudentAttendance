import { userService } from './../service/user.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { studentModel } from '../models/student';
import { studentService } from '../service/student.service';
import { classModel } from '../models/class';
import { classService } from '../service/class.service';
import { userModel } from '../models/user';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.scss'],
})
export class StudentRegistrationComponent {
  studentList: studentModel[] = [];
  classList: classModel[] = [];

  //student form
  studentForm = new FormGroup({
    Id: new FormControl(),
    Name: new FormControl('',Validators.required),
    Contact: new FormControl('',Validators.required),
    Address: new FormControl('',Validators.required),
    UserName: new FormControl('',Validators.required),
    Password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]).{4,20}$')]),
    ClassID: new FormControl(0,Validators.required),
  });



//constructor
  constructor(
    private studentService: studentService,
    private classService: classService,
    private userService: userService,
    private route:Router
  ) {}

  ngOnInit() {
    this.classList = this.classService.showAll();
  }

  readonly dialog = inject(MatDialog);

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(DialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  //student registration
  Registration() {
    if (this.studentForm.valid) {
      const user: userModel = {} as userModel;

      user.UserName = this.studentForm.get('UserName')?.value?.toString()!;
      user.Password = this.studentForm.get('Password')?.value?.toString()!;
      user.Id = this.userService.getMaxId();
      user.Role="Student"
      user.IsActive=true;
      if (user.Id > 0 ) {
        //user save
        const response = this.userService.save(user);
        if(response){
          if (response != null || response != undefined) {
            const studentData: studentModel = {} as studentModel;

            studentData.Address = this.studentForm.get('Address')?.value?.toString()!;
            studentData.Contact = this.studentForm.get('Contact')?.value?.toString()!;
            studentData.Name = this.studentForm.get('Name')?.value?.toString()!;

            studentData.ClassID = this.studentForm.get('ClassID')?.value!;

            studentData.Id = this.studentService.getMaxId();
            studentData.UserId=user.Id;

            //student save
            if (studentData.Id > 0) {
              const res=this.studentService.save(studentData);
              if(res){
                this.studentForm.reset();
                alert('Student Registered Successfully');
                this.studentForm.reset;
              }else{
                this.userService.delete(user.Id)
              }
            }
          }
        }
      }
    } else {
      alert('Please Fill All Input !');
    }
  }
}
