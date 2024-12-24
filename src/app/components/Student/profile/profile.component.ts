import { classService } from './../../../service/class.service';
import { Component } from '@angular/core';
import { classModel } from 'src/app/models/class';
import { studentModel } from 'src/app/models/student';
import { userModel } from 'src/app/models/user';
import { studentService } from 'src/app/service/student.service';
import { userService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userForm:any={
    UserName:'',
    Role:'',
    Password:'',
    Name:'',
    Contact:'',
    Address:'',
    UserId:0,
    ClassID:0,
    IsActive:true,
  }



  user:userModel={} as userModel
  student:studentModel={} as studentModel

  classList:classModel[]=[]
  constructor(
    private studentService:studentService,
    private userService:userService,
    private classService:classService
  ){}

  ngOnInit(){

    const userData=localStorage.getItem('LoggedInUser');
    this.user=JSON.parse(userData?.toString()!);

    this.userForm.UserName=this.user.UserName;
    this.userForm.Password=this.user.Password;
    this.userForm.Role=this.user.Role;


    this.student=this.studentService.getByUserId(this.user.Id)
    this.userForm.Name=this.student.Name
    this.userForm.Contact=this.student.Contact
    this.userForm.Address=this.student.Address
    this.userForm.UserId=this.student.UserId
    this.userForm.ClassID=this.student.ClassID
    //this.userForm.IsActive=this.student.IsActive


    this.classList=this.classService.showAll();
  }


  update(){
    if(this.student.Id>0){

      const user:userModel={} as userModel
      user.Id=this.userForm.userId;
      user.Password=this.userForm.Password;
      user.Role='Student',
      user.UserName=this.userForm.UserName
      user.IsActive=this.userForm.isActive;

      this.userService.update(user);

      //update student
      const t:studentModel={} as studentModel

      t.Id=this.userForm.Id
      t.Name=this.userForm.name
      t.Address=this.userForm.address
      t.Contact=this.userForm.contact
      t.UserId=this.userForm.userId
      //t.IsActive=this.student.isActive;
      t.ClassID=this.userForm.ClassId;

      this.studentService.updateStudent(t)

      this.userForm.reset

      alert("Record Updated Successfully")

    }

  }
}
