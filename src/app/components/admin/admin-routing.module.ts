
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrmClassComponent } from './frm-class/frm-class.component';
import { AdminComponent } from './admin.component';
import { FrmTeacherComponent } from './frm-teacher/frm-teacher.component';
import { FrmStudentComponent } from './frm-student/frm-student.component';
import { AuthGuard } from 'src/app/gaurd/auth.guard';

const routes: Routes = [
   {
      path:'',
      component:AdminComponent,
      canActivate:[AuthGuard],
      data:{ roles:['Admin']},
      children:[
        {
          path:'',
          component:FrmClassComponent
        },{
          path:'frmTeacher',
          component:FrmTeacherComponent
        },{
          path:'frmClass',
          component:FrmClassComponent
        },
        {
          path:'frmStudent',
          component:FrmStudentComponent
        },
      ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
