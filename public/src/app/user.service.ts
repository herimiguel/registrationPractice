import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class UserService {

  constructor(private _http: Http) { }

  retrieveU(){
    return this._http.get('/api/give').map(data => data.json()).toPromise();
  }

  sendU(user){
    return this._http.post('/api/create', user).map(data => data.json()).toPromise();
  }

  login(user){
    return this._http.post('/api/login', user).map(data => data.json()).toPromise();
  }

  grabU(){
    return this._http.get('api/account').map(data => data.json()).toPromise();
  }

  sendApt(apt){
    return this._http.post('/api/add', apt).map(data => data.json()).toPromise();
  }

  retrieveApt(){
    console.log("GETTINGAPT")
    return this._http.get('/api/appointments').map(data => data.json()).toPromise();
  }

  destroyApt(apt){
    console.log("in Service!!")
    var context ={id: apt}
    return this._http.post('/api/destroy', context).map(data => data.json()).toPromise();
  }

  logout(){
    return this._http.get('/api/out').map(data => data.json()).toPromise();
  }

}
