
import { Injectable } from "@angular/core";
import { classModel } from "../models/class";

@Injectable()
export class classService{
  private storageKey: string = 'classMaster';


  //Show All
  showAll(): classModel[] {
      const classMaster = localStorage.getItem(this.storageKey);
      return classMaster ? JSON.parse(classMaster) : [];
  }


  //Save
  save(data:classModel):boolean{
    if( this.duplicateEntry(data.name)){
      const classMaster = this.showAll();
      classMaster.push(data);
      localStorage.setItem(this.storageKey, JSON.stringify(classMaster));
      return true
    }
      alert(data.name+' Already Exist')
      return false

  }

  // Update
  updateStudent(data: classModel): boolean {
    if( this.duplicateEntry(data.name)){
    const classMaster = this.showAll();
    const index = classMaster.findIndex(s => s.Id === data.Id);
      if (index !== -1) {
        classMaster[index] = data;
        localStorage.setItem(this.storageKey, JSON.stringify(classMaster));
        return true
      }
    }
    alert(data.name+' Already Exist')
      return false
  }

  // Delete
  delete(id: number): void {
    const classMaster = this.showAll();
    const filteredclassMaster = classMaster.filter(s => s.Id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filteredclassMaster));
  }

  // max ID
  getMaxId(): number {
    const classMaster = this.showAll();
    if (classMaster.length == 0 || classMaster.length==null) {
      return 1;
    }
    return Math.max(...classMaster.map(student => student.Id))+1;
  }

  duplicateEntry(name:string):boolean{
    const classMaster = this.showAll();
    const result=classMaster.find(x=>x.name.toLowerCase()==name.toLowerCase())
    if(result?.Id){
      return false
    }
    return true
  }

  // Get ID
  getById(id:number):classModel {
    const classMaster = this.showAll();

    return classMaster.find(x=>x.Id==id) as classModel
  }

}
