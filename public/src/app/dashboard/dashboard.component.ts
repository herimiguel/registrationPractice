import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user = {};
  appointments;
  constructor(private _userService: UserService, private _router: Router ) { }


  ngOnInit() {
    this.currentU();
    console.log(" CHECK!!")
    console.log(this.user)
    this.grabApts();
  }

  currentU(){
    this._userService.grabU().then(user => this.user = user).catch(err => console.log(err));
  }

  grabApts(){
    this._userService.retrieveApt().then(apts => this.appointments = apts).catch(err => console.log(err));
  }

  toLogout(){
    console.log("logged out");
    
    this._userService.logout().then(response => {this._router.navigateByUrl('/');}).catch(err => console.log(err));

  }
  
  deleteApt(apt){
    console.log(apt);
    this._userService.destroyApt(apt).then(response => console.log("Deleting!!")).catch(err => console.log(err));
    this.grabApts();
  }

  makeApt(){
    this._router.navigateByUrl('/toApt');
  }
}
