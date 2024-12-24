import { studentService } from './../../service/student.service';

import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, inject} from '@angular/core';
import { Router } from '@angular/router';
import { studentModel } from 'src/app/models/student';
import { userModel } from 'src/app/models/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent {
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  student:studentModel={} as studentModel;
  studentList:studentModel[]=[]
  constructor(
    private studentService:studentService,
    private router:Router
  ) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  LoggedUser:userModel={} as userModel

  ngOnInit(){
    this.studentList=this.studentService.showAll()

    const userData=localStorage.getItem('LoggedInUser');
    this.LoggedUser=JSON.parse(userData?.toString()!)
    console.log(this.LoggedUser)

    this.student=Object(this.studentList.find(x=>x.UserId==this.LoggedUser.Id))
    console.log(this.student);

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
    localStorage.removeItem('LoggedInUser');
  }

  logout(){
    localStorage.removeItem('LoggedInUser')
    this.router.navigate(['/login'])
  }

}
