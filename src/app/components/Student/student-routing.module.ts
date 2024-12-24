import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceComponent } from './attendance/attendance.component';
import { StudentComponent } from './student.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from 'src/app/gaurd/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:StudentComponent,
    canActivate:[AuthGuard],
    data:{ roles:['Student']},
    children:[
      {
        path:'',
        component:AttendanceComponent
      },
      {
        path:'frmAttendance',
        component:AttendanceComponent
      },
      {
        path:'frmProfile',
        component:ProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
