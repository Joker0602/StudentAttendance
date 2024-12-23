import { userService } from 'src/app/service/user.service';
import { classModel } from './models/class';
import { Component } from '@angular/core';
import { classService } from './service/class.service';
import { userModel } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userList:userModel[]=[]
  constructor(
    private classService:classService,
    private userService:userService
  ){}
  class:classModel = {} as classModel;
  ngOnInit(){
    if(!localStorage.getItem('classMaster')){
      this.class.Id=1;
      this.class.name='B.Sc'
      this.classService.save(this.class)
    }

    this.userList=this.userService.showAll();
    const user=this.userList.find(x=>x.UserName.toLowerCase()=='admin')
    console.log(user?.UserName)
    if(user?.UserName.toLowerCase()!='admin'){
        const userData:userModel={} as userModel
        userData.Id=this.userService.getMaxId();
        userData.Password='password';
        userData.Role='Admin';
        userData.UserName='admin';
        userData.IsActive=true;
        this.userService.save(userData);
    }
  }
}
