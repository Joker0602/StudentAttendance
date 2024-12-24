import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher.component';
import { StudentListComponent } from './student-list/student-list.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AuthGuard } from 'src/app/gaurd/auth.guard';
import { ProfileComponent } from '../Student/profile/profile.component';

const routes: Routes = [
   {
      path:'',
      component:TeacherComponent,
      canActivate:[AuthGuard],
      data:{ roles:['Teacher']},
      children:[
        {
        path:'',
        component:StudentListComponent
      },{
        path:'studentList',
        component:StudentListComponent
      },
      {
        path:'frmAttendance',
        component:AttendanceListComponent
      },
      {
        path:'frmProfile',
        component:ProfileComponent
      },
    ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
