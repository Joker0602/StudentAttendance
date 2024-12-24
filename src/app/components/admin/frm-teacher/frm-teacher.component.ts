import { userService } from 'src/app/service/user.service';
import { teacherService } from 'src/app/service/teacher.service';
import { Component, ViewChild } from '@angular/core';
import { teacherModule } from 'src/app/models/teacher';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userModel } from 'src/app/models/user';
import { studentModel } from 'src/app/models/student';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface tempTeacher{
  Id:number,
  name:string,
  contact:string,
  address:string,
  userId:number,
  srNumber:number,
}

@Component({
  selector: 'app-frm-teacher',
  templateUrl: './frm-teacher.component.html',
  styleUrls: ['./frm-teacher.component.scss']
})
export class FrmTeacherComponent {
  btnSubmit='Save'
  teacherList:teacherModule[]=[]
  userList:userModel[]=[]
  // teacher:teacherModule={} as teacherModule

  displayedColumns: string[] = ['srNumber', 'Name','Contact','User Name','Address', 'Edit', 'Delete'];
    dataSource: MatTableDataSource<tempTeacher>;
    formSubmitted :boolean=false

    tempTeacherList: tempTeacher[] = [];
    @ViewChild(MatPaginator) paginator: MatPaginator | any;
    @ViewChild(MatSort) sort: MatSort | any;
    textFilterValue: string = '';

  teacher={
    Id:0,
    name:'',
    contact:'',
    address:'',
    userId:0,
    isActive:true,
    UserName:'',
    Password:''
  }
  //teacher form
    teacherForm = new FormGroup({
      Id: new FormControl(),
      Name: new FormControl('',Validators.required),
      Contact: new FormControl(0,[Validators.required]),
      Address: new FormControl('',Validators.required),
      UserName: new FormControl('',Validators.required),
      Password: new FormControl('',[Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*()\\-_+=\\[\\]{}|;:,.<>?]).{8,20}$')]),
      isActive: new FormControl(false,Validators.required)
    });
  constructor(
    private teacherService:teacherService,
    private userService:userService,
  ){

    let srNumber = 1;

    this.teacherList = this.teacherService.showAll();
    this.teacherList.forEach((res) => {
      this.tempTeacherList.push({
        srNumber: srNumber,
        name: res.name,
        Id: res.Id,
        address:res.address,
        contact:res.contact,
        userId:res.userId
      });
      srNumber++;
    });
    this.dataSource = new MatTableDataSource(this.tempTeacherList);

  }


  ngOnInit(){
    this.getAll()

  }

  getAll(){
    let srNumber = 1;
    this.tempTeacherList=[]
    this.teacherList = this.teacherService.showAll();
    this.teacherList.forEach((res) => {
      this.tempTeacherList.push({
        srNumber: srNumber,
        name: res.name,
        Id: res.Id,
        address:res.address,
        contact:res.contact,
        userId:res.userId
      });
      srNumber++;
    });
    this.dataSource = new MatTableDataSource(this.tempTeacherList);

    this.teacherList=this.teacherService.showAll();
    this.userList=this.userService.showAll();
    this.btnSubmit='Save'
  }


  //student registration
    Save() {

      if (this.teacherForm.valid && this.teacher.Id == 0) {
        const user: userModel = {} as userModel;

        user.UserName = this.teacherForm.get('UserName')?.value?.toString()!;
        user.Password = this.teacherForm.get('Password')?.value?.toString()!;
        user.IsActive = this.teacherForm.get('isActive')?.value!;
        user.Id = this.userService.getMaxId();
        user.Role="Teacher"
        if (user.Id > 0) {
          //user save
          const response = this.userService.save(user);

          if (response != null || response != undefined) {
            const teacherDate: teacherModule = {} as teacherModule;

            teacherDate.address = this.teacherForm.get('Address')?.value?.toString()!;
            teacherDate.contact = this.teacherForm.get('Contact')?.value?.toString()!;
            teacherDate.name = this.teacherForm.get('Name')?.value?.toString()!;



            teacherDate.Id = this.teacherService.getMaxId();
            teacherDate.userId=user.Id;

            //student save
            if (teacherDate.Id > 0) {
              const res=this.teacherService.save(teacherDate);
              if(res){
              alert('Teacher Registered Successfully');
              }
            }
            this.teacherForm.reset;
            this.getAll()
          }
        }
      }else if(this.teacher.Id > 0 && this.teacher.userId>0){
        this.update();
        this.teacherForm.reset;
        this.getAll()
      }

      else {
        this.teacherForm.value
        alert('Please Fill All Input !');
      }
    }

  update(){
    if(this.teacher.Id>0){

      const user:userModel={} as userModel

      user.Id=this.teacher.userId;
      user.Password=this.teacher.Password;
      user.Role='Teacher',
      user.UserName=this.teacher.UserName
      user.IsActive=this.teacher.isActive;


      this.userService.update(user);
      const t:teacherModule={} as teacherModule
      t.Id=this.teacher.Id
      t.name=this.teacher.name
      t.address=this.teacher.address
      t.contact=this.teacher.contact
      t.userId=this.teacher.userId


      this.teacherService.update(t)


      alert("Record Updated Succeffully")
      this.btnSubmit='Save'
    }

  }


  edit(id: number) {
    // const c = this.teacherService.getById(id);

    // this.teacher.Id = c.Id;
    // this.teacher.name = c.name;
    // this.teacher.contact=c.contact;
    // this.teacher.address=c.address;
    // this.teacher.userId=c.userId;
    // this.teacher.isActive=c.isActive;


    const c=Object(this.teacherList.find(x=>x.Id==id))
    this.teacher.Id = c.Id;
    this.teacher.name = c.name;
    this.teacher.contact=c.contact;
    this.teacher.address=c.address;
    this.teacher.userId=c.userId;



    // const u = this.userService.getById(this.teacher.userId)
    const u = Object(this.userList.find(x=>x.Id==c.userId))
    this.teacher.UserName=u.UserName;
    this.teacher.Password=u.Password
    this.teacher.isActive=u.IsActive;
    this.getAll()
    this.btnSubmit='Update'
  }

  delete(id: number) {
    if(confirm("Do You Want To Delete?")){
    this.teacherService.delete(id);
    this.btnSubmit='Save'
    this.teacherList=this.teacherService.showAll()
    this.getAll()
    alert("Recode Deleted Successfully")
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
