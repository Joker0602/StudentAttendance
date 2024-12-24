import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { studentModel } from 'src/app/models/student';
import { teacherModule } from 'src/app/models/teacher';
import { userModel } from 'src/app/models/user';
import { studentService } from 'src/app/service/student.service';
import { teacherService } from 'src/app/service/teacher.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;
  teacher:teacherModule={} as teacherModule;
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
    const userData=localStorage.getItem('LoggedInUser');
    this.LoggedUser=JSON.parse(userData?.toString()!)
    console.log(this.LoggedUser)

    this.teacher=this.teacherService.getByUserId(this.LoggedUser.Id);
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
