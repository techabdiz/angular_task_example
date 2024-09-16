import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {



  doneAppointment(index: number) {
    let done = this.appointments.splice(index, 1)
    this.done_appointments.push(done[0])
  }

  redoTask(index: number) {
    let redo = this.done_appointments.splice(index, 1)
    this.appointments.push(redo[0])
  }

  done_appointments: Appointment[]=[]
  newAppointmentTitle: string = ''
  newAppointmentDate: Date = new Date();

  title: string = 'appointment-list-component'

  current_time: string = 'visiting the dentist'

  appointments: Appointment[]=[];

  constructor() { 
      setInterval(()=>{ 
        let date: Date = new Date()
        this.current_time = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }, 500);

  }

  addAppointment() { 
    let newApp: Appointment = {
      title: this.newAppointmentTitle,
      date: this.newAppointmentDate,
      id: this.appointments.length+1
    }
    this.appointments.push(newApp)
    this.newAppointmentTitle=''

    this.newAppointmentDate = new Date('2024-09-20')
  }

  sayHello(name: string) : string { 
    var message =  'Hello, ' + name
    return message
  }
}
