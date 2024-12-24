
import { Injectable } from "@angular/core";
import { classModel } from "../models/class";
import { userModel } from "../models/user";

@Injectable()
export class userService{
  private storageKey: string = 'User';


  //Show All
  showAll(): userModel[] {
      const user = localStorage.getItem(this.storageKey);
      return user ? JSON.parse(user) : [];
  }


  //Save
  save(data:userModel){
    if(this.duplicateEntry(data.UserName)){
      const user = this.showAll();
      user.push(data);
      localStorage.setItem(this.storageKey, JSON.stringify(user));
      return data
    }else{
      alert(data.UserName+" Already Exist User.")
      return false
    }

  }

  // Update
  update(data: userModel): void {
    const user = this.showAll();
    const index = user.findIndex(s => s.Id === data.Id);
    if (index !== -1) {
      user[index] = data;
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    }
  }

  // Delete
  delete(id: number): void {
    const user = this.showAll();
    const filtereduser = user.filter(s => s.Id !== id);
    localStorage.setItem(this.storageKey, JSON.stringify(filtereduser));
  }

  // max ID
  getMaxId(): number {
    const user = this.showAll();
    if (user.length == 0 || user.length==null) {
      return 1;
    }
    return Math.max(...user.map(user => user.Id))+1;
  }

  //id
  getById(id:number): userModel {
    const user = this.showAll();
      return user.find(x=>x.Id=id)  as userModel
    }

    //duplicates
    duplicateEntry(name:string):boolean{
      const user = this.showAll();
      const result=user.find(x=>x.UserName.toLowerCase()==name.toLowerCase())
      if(result?.Id){
        return false
      }
      return true
    }

}
