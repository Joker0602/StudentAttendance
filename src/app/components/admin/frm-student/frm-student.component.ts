import { Component, ViewChild } from '@angular/core';
import { userService } from 'src/app/service/user.service';
import { teacherModule } from 'src/app/models/teacher';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/user';
import { studentService } from 'src/app/service/student.service';
import { studentModel } from 'src/app/models/student';
import { classModel } from 'src/app/models/class';
import { classService } from 'src/app/service/class.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

export interface tempStudent{
  Id:number,
  name:string,
  contact:string,
  address:string,
  userId:number,
  srNumber:number,
}
@Component({
  selector: 'app-frm-student',
  templateUrl: './frm-student.component.html',
  styleUrls: ['./frm-student.component.scss']
})
export class FrmStudentComponent {
 btnSubmit='Save'
  studentList:studentModel[]=[]
  userList:userModel[]=[]
  classList: classModel[] = [];
  displayedColumns: string[] = ['srNumber', 'Name','Contact','User Name','Address', 'Edit', 'Delete'];
      dataSource: MatTableDataSource<tempStudent>;


      tempStudentList: tempStudent[] = [];
      @ViewChild(MatPaginator) paginator: MatPaginator | any;
      @ViewChild(MatSort) sort: MatSort | any;
      textFilterValue: string = '';
  student={
    Id:0,
    name:'',
    contact:'',
    address:'',
    userId:0,
    isActive:true,
    UserName:'',
    Password:'',
    ClassId:0
  }
  //teacher form
    studentForm = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl('',Validators.required),
      Contact: new FormControl('',Validators.required),
      Address: new FormControl('',Validators.required),
      UserName: new FormControl('',Validators.required),
      Password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]).{8,20}$')]),
      isActive: new FormControl(false,Validators.required),
      ClassID: new FormControl(0,Validators.required),
    });
  constructor(
    private studentService:studentService,
    private userService:userService,
    private classService: classService,
  ){

    let srNumber = 1;

    this.studentList = this.studentService.showAll();
    this.studentList.forEach((res) => {
      this.tempStudentList.push({
        srNumber: srNumber,
        name: res.Name,
        Id: res.Id,
        address:res.Address,
        contact:res.Contact,
        userId:res.UserId
      });
      srNumber++;
    });

    this.dataSource = new MatTableDataSource(this.tempStudentList);


  }


  ngOnInit(){
    this.classList = this.classService.showAll();
    this.userList=this.userService.showAll();
  }

  getAll(){

    console.log(this.userList)
    let srNumber = 1;
    this.tempStudentList=[]
    this.studentList = this.studentService.showAll();
    this.studentList.forEach((res) => {
      this.tempStudentList.push({
        srNumber: srNumber,
        name: res.Name,
        Id: res.Id,
        address:res.Address,
        contact:res.Contact,
        userId:res.UserId
      });
      srNumber++;
    });
    this.dataSource = new MatTableDataSource(this.tempStudentList);

    this.studentList=this.studentService.showAll();
    this.userList=this.userService.showAll();
    this.btnSubmit='Save'
    this.studentForm.reset
  }


  //student registration
    Save() {
      if (this.studentForm.valid && this.student.Id == 0) {
        const user: userModel = {} as userModel;

        user.UserName = this.studentForm.get('UserName')?.value?.toString()!;
        user.Password = this.studentForm.get('Password')?.value?.toString()!;
        user.Id = this.userService.getMaxId();
        user.IsActive= this.studentForm.get('isActive')?.value!;

        user.Role="Teacher"
        if (user.Id > 0) {
          //user save
          const response = this.userService.save(user);

          if (response != null || response != undefined) {
            const studentData: studentModel = {} as studentModel;

            studentData.Address= this.studentForm.get('Address')?.value?.toString()!;
            studentData.Contact = this.studentForm.get('Contact')?.value?.toString()!;
            studentData.Name = this.studentForm.get('Name')?.value?.toString()!;
            studentData.ClassID = this.studentForm.get('ClassID')?.value!;

            //studentData.IsActive = this.studentForm.get('isActive')?.value!;
            studentData.Id = this.studentService.getMaxId();
            studentData.UserId=user.Id;

            //student save
            if (studentData.Id > 0) {
              const res=this.studentService.save(studentData);
              if(res){
              alert('Student Saved Successfully');

              }
            }
            this.studentForm.reset
            this.getAll()
          }
        }
      }else if(this.student.Id > 0 && this.student.userId>0){
        this.update();
        this.studentForm.reset
        this.getAll()
      }

      else {
        alert('Please Fill All Input !');
      }
    }

  update(){
    if(this.student.Id>0){

      const user:userModel={} as userModel
      user.Id=this.student.userId;
      user.Password=this.student.Password;
      user.Role='Student',
      user.UserName=this.student.UserName
      user.IsActive=this.student.isActive;

      this.userService.update(user);

      //update student
      const t:studentModel={} as studentModel

      t.Id=this.student.Id
      t.Name=this.student.name
      t.Address=this.student.address
      t.Contact=this.student.contact
      t.UserId=this.student.userId
      //t.IsActive=this.student.isActive;
      t.ClassID=this.student.ClassId;

      this.studentService.updateStudent(t)

      this.studentForm.reset

      alert("Record Updated Successfully")
      this.btnSubmit='Save'
    }

  }


  edit(id: number) {
    // const c = this.studentService.getById(id);

    // this.teacher.Id = c.Id;
    // this.teacher.name = c.name;
    // this.teacher.contact=c.contact;
    // this.teacher.address=c.address;
    // this.teacher.userId=c.userId;
    // this.teacher.isActive=c.isActive;
    const c=Object(this.studentList.find(x=>x.Id==id))
    this.student.Id = c.Id;
    this.student.name = c.Name;
    this.student.contact=c.Contact;
    this.student.address=c.Address;
    this.student.userId=c.UserId;

    this.student.ClassId=c.ClassID

    // const u = this.userService.getById(this.teacher.userId)
    const u = Object(this.userList.find(x=>x.Id==c.UserId))
    this.student.UserName=u.UserName;
    this.student.Password=u.Password
    this.student.isActive=u.IsActive;
    console.log()
    this.getAll()
    this.btnSubmit='Update'
  }

  delete(id: number) {
    if(confirm("Do You Want To Delete")){
      this.studentService.deleteStudent(id);
      this.btnSubmit='Save'
      this.studentList=this.studentService.showAll()
      this.getAll()
      alert("Record Deleted Successfully")
    }
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
