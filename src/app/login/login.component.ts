import { Component } from '@angular/core';
import { studentService } from '../service/student.service';
import { classService } from '../service/class.service';
import { userService } from '../service/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { classModel } from '../models/class';
import { studentModel } from '../models/student';
import { userModel } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  studentList: studentModel[] = [];
  classList: classModel[] = [];
  userList: userModel[] = [];
  //student form
  studentForm = new FormGroup({
    UserName: new FormControl('',Validators.required),
    Password: new FormControl('',Validators.required),
  });

  constructor(
    private studentService: studentService,
    private classService: classService,
    private userService: userService,
    private route: Router
  ) {}

  ngOnInit() {
    this.userList = this.userService.showAll();
  }

  login() {
    var response: userModel = {} as userModel;
    const userName = this.studentForm.get('UserName')?.value!;
    const passsword = this.studentForm.get('Password')?.value!;

    response = Object(
      this.userList.find(
        (x) => x.UserName == userName && x.Password == passsword
      )
    );

    if (response.Id > 0) {
      if (response.IsActive == true) {
        localStorage.setItem('LoggedInUser', JSON.stringify(response));
        alert('Loggin Successfully !');

        if (response.Role == 'Student') {
          this.route.navigate(['/Student']);
        } else if (response.Role == 'Teacher') {
          this.route.navigate(['/Teacher']);
        } else if (response.Role == 'Admin') {
          this.route.navigate(['/Admin']);
        }
      }
      else{
        alert("You Are Blocked For Some Reason. Please Contact To Admin !")
      }
    } else {
      alert('User Name and Password Not Matched');
    }
  }
}
