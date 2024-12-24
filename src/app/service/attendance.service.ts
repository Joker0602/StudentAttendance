import { studentModel } from './../models/student';
import { Injectable } from "@angular/core";
import { attendanceModel } from "../models/attendance";
import { Observable } from 'rxjs';

@Injectable()
export class attendanceService{
 private storageKey: string = 'attendace';
 private attendance:attendanceModel[]=[]

   //Show All
   showAll():attendanceModel[] {
       const attendance = localStorage.getItem(this.storageKey);


       return attendance ? JSON.parse(attendance) : [];

   }


   //Save
   save(attendances:attendanceModel){
     const attendance = this.showAll();
     attendance.push(attendances);
     localStorage.setItem(this.storageKey, JSON.stringify(attendance));
   }

   // Update
   updateStudent(attendance: attendanceModel): void {
     const att = this.showAll();
     const index = att.findIndex(s => s.Id === attendance.Id);
     if (index !== -1) {
      att[index] = attendance;
       localStorage.setItem(this.storageKey, JSON.stringify(att));
     }
   }

   // Delete
   deleteStudent(id: number): void {
     const att = this.showAll();
     const filteredatt = att.filter(s => s.Id !== id);
     localStorage.setItem(this.storageKey, JSON.stringify(filteredatt));
   }

   // max ID
   getMaxId(): number {
     const att = this.showAll();
     if (att.length == 0 || att.length==null) {
       return 1;
     }
     return Math.max(...att.map(att => att.Id))+1;
   }

   //Get BY StudentID

  getByStudentId(id:number): any {
    const attendance = this.showAll();
      return attendance.filter(x=>x.studentId==id)
    }
}
