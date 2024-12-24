import { Injectable } from '@angular/core';
import { studentModel } from '../models/student';
import { TeacherModule } from '../components/teacher/teacher.module';
import { teacherModule } from '../models/teacher';

@Injectable()
export class teacherService {
  private storageKey: string = 'teacher';

  //Show All
  showAll(): teacherModule[] {
    const teacher = localStorage.getItem(this.storageKey);
    return teacher ? JSON.parse(teacher) : [];
  }

  //Save
  save(teachers: teacherModule) {
    if (this.duplicateEntry(teachers.name, teachers.contact)) {
      const teacher = this.showAll();
      teacher.push(teachers);
      localStorage.setItem(this.storageKey, JSON.stringify(teacher));
      return true;
    }
    alert('Aleady Exist Name and Contact');
    return false;
  }

  // Update
  update(updatedStudent: teacherModule): void {
    const teacher = this.showAll();
    const index = teacher.findIndex((s) => s.Id === updatedStudent.Id);
    if (index !== -1) {
      teacher[index] = updatedStudent;
      localStorage.setItem(this.storageKey, JSON.stringify(teacher));
    }
  }

  // Delete
  delete(id: number): void {
    const teacher = this.showAll();
    const filteredteacher = teacher.filter((s) => s.Id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredteacher));
  }

  // max ID
  getMaxId(): number {
    const teacher = this.showAll();
    if (teacher.length == 0 || teacher.length == null) {
      return 1;
    }
    return Math.max(...teacher.map((teacher) => teacher.Id)) + 1;
  }

  //get by user id
  getByUserId(id: number): any {
    const teacher = this.showAll();
    return teacher.filter((x) => (x.userId = id));
  }

  //get by id
  getById(id: number): teacherModule {
    console.log(id)
    const teacher = this.showAll();
    return teacher.find((x) => (x.Id = id)) as teacherModule;
  }

  //duplicate entry
  duplicateEntry(name: string, contact: string): boolean {
    const teach = this.showAll();
    const result = teach.find(
      (x) => x.name.toLowerCase() == name.toLowerCase() || x.contact == contact
    );
    if (result?.Id) {
      return false;
    }
    return true;
  }
}
