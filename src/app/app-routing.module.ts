import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentModule } from './components/Student/student.module';
import { LoginComponent } from './login/login.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';

const routes: Routes = [
  {
    path:'Student',
    loadChildren:()=>import('./components/Student/student.module').then(x=>x.StudentModule)
  },
  {
    path:'Teacher',
    loadChildren:()=>import('./components/teacher/teacher.module').then(x=>x.TeacherModule)
  },
  {
    path:'Admin',
    loadChildren:()=>import('./components/admin/admin.module').then(x=>x.AdminModule)
  },
  {
    path:'',
    component:LoginComponent
  }
  ,
  {
    path:'login',
    component:LoginComponent
  }
  ,
  {
    path:'Registration',
    component:StudentRegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
