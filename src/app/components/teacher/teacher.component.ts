import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { studentModel } from 'src/app/models/student';
import { teacherModule } from 'src/app/models/teacher';
import { userModel } from 'src/app/models/user';
import { studentService } from 'src/app/service/student.service';
import { teacherService } from 'src/app/service/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent {
 mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  teacher:teacherModule={} as teacherModule;
  teacherList:teacherModule[]=[]
  constructor(
    private studentService:studentService,
    private teacherService:teacherService,
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
    this.teacherList = this.teacherService.showAll()
    const userData=localStorage.getItem('LoggedInUser');
    this.LoggedUser=JSON.parse(userData?.toString()!)
    console.log(this.LoggedUser)

    this.teacher=Object(this.teacherList.find(x=>x.userId==this.LoggedUser.Id));
    console.log(this.LoggedUser.Id);

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
