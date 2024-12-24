import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { AttendanceComponent } from './attendance/attendance.component';
import { StudentComponent } from './student.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AttendanceComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    FormsModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule
  ]
})
export class StudentModule { }
