import { Injectable } from "@angular/core";
import { studentModel } from "../models/student";

@Injectable()
export class studentService{
  private storageKey: string = 'students';


  //Show All
  showAll(): studentModel[] {
      const students = localStorage.getItem(this.storageKey);
      return students ? JSON.parse(students) : [];
  }


  //Save
  save(student:studentModel):boolean{
    if(this.duplicateEntry(student.Contact)){
      const students = this.showAll();
      students.push(student);
      localStorage.setItem(this.storageKey, JSON.stringify(students));
      return true;
    }
    alert(student.Name+' Student Already Exist.')
    return false

  }

  // Update
  updateStudent(updatedStudent: studentModel): void {
    const students = this.showAll();
    const index = students.findIndex(s => s.Id === updatedStudent.Id);
    if (index !== -1) {
      students[index] = updatedStudent;
      localStorage.setItem(this.storageKey, JSON.stringify(students));
    }
  }

  // Delete
  deleteStudent(id: number): void {
    const students = this.showAll();
    const filteredStudents = students.filter(s => s.Id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredStudents));
  }

  // max ID
  getMaxId(): number {
    const students = this.showAll();
    if (students.length == 0 || students.length==null) {
      return 1;
    }
    return Math.max(...students.map(student => student.Id))+1;
  }

  // User ID
  getByUserId(id:number): any {
    const students = this.showAll();
    return students.find(x=>x.UserId=id)
  }

  duplicateEntry(name:string):boolean{
    const stud = this.showAll();
    const result=stud.find(x=>x.Contact.toLowerCase()==name.toLowerCase())
    if(result?.Id){
      return false
    }
    return true
  }

}
