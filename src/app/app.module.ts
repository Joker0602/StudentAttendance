import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';


import { LoginComponent } from './login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { StudentComponent } from './components/Student/student.component';
import { StudentRegistrationComponent } from './student-registration/student-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { studentService } from './service/student.service';
import { classService } from './service/class.service';
import { userService } from './service/user.service';
import { DialogComponent } from './components/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { attendanceService } from './service/attendance.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { TeacherComponent } from './components/teacher/teacher.component';
import { teacherService } from './service/teacher.service';
import { AuthGuard } from './gaurd/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    AdminComponent,
    StudentRegistrationComponent,
    DialogComponent,
    TeacherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
     MatButtonModule,
     MatIconModule,
     MatSidenavModule,
     MatListModule,
     MatCardModule,
     MatChipsModule,
     MatProgressBarModule,
     MatDialogModule,
     MatFormFieldModule, MatSelectModule
  ],
  providers: [
    studentService,
    classService,
    userService,
    attendanceService,
    teacherService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
