import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';
import { Appointment } from '../appointment';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  user
  holdUser = this.user;
  appointment = new Appointment();  
  apt = {patient: 0, date: '', time: '', complaint: ''};
  datetime= new Date();
  constructor(private _userService: UserService, private _router: Router) { }
  ngOnInit() {
    this.currentU();
  }
  currentU(){
    this._userService.grabU().then(user => this.user = user).catch(err => console.log(err));
  }
  createApt(){
    var dd = new Date(this.apt.date).getDate();
    this.datetime.setDate(dd+1)
    var mm = new Date(this.apt.date).getMonth();
    this.datetime.setMonth(mm)
    var yy = new Date(this.apt.date).getFullYear();
    this.datetime.setFullYear(yy)
    var hh = this.apt.date.slice(0,2)
    var ms = this.apt.date.slice(3,5)
    this.datetime.setHours(parseInt(hh))
    this.datetime.setMinutes(parseInt(ms))

    this.appointment.datetime = this.datetime;
    this.appointment.complaint = this.apt.complaint;
    this.appointment.patient = this.user;
    this._userService.sendApt(this.appointment).then(response => { this._router.navigateByUrl('/toDashboard');}).catch(err => console.log(err));
    this.appointment = new Appointment()
    this.apt = {patient: 0, date: '', time: '', complaint: ''}
  }

  dash(){
    this._router.navigateByUrl('/toDashboard');
  }
}
