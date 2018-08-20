import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  users;
  user = new User();
  login;
  exists = false;
  registered = false;
  passWordError = false;
  emailError = false;
  onlyPassWord = false;


  constructor(private _userService: UserService, private _router: Router) { }

  ngOnInit() {
    this.gettingUsers();
    this.login = {email: '', password: ''}
  }

  gettingUsers(){
    this._userService.retrieveU().then(users => this.users = users).catch(err => console.log(err));
  }

  makeUser(){
    this.exists = false;
    for(let i in this.users){
      if(this.users[i].email == this.user.email){
        this.exists = true;
        this.user = new User();
      }
    }
    if(!this.exists){
      this._userService.sendU(this.user).then(response => {this._router.navigateByUrl('/toDashboard');}).catch(err => console.log(err));
      this.user = new User();
      this.gettingUsers();
      
    }
  }
  loginUser(){
    this.registered = false;
    this.passWordError = false;
    this.emailError = false;
    this.onlyPassWord = false;
    for(let i in this.users){
      if(this.users[i].email == this.login.email){
        if(this.users[i].password== this.login.password){
          this.registered = true;
        }else{
          this.passWordError = true;
          this.onlyPassWord = true;
        }
      }
    }
    if(this.registered){
      this._userService.login(this.login).then(response => {
        this._router.navigateByUrl('/toDashboard');}).catch(err => console.log(err));
    } else if (this.onlyPassWord){
      this.emailError = false;
    } else {
      this.emailError = true;
    }
  }
}
