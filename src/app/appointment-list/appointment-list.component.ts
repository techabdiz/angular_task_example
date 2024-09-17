import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
import { ApiServiceService } from '../api-service.service';
import { Page } from '../page';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit{

  tabActive='TASK'

 

  doneAppointment(index: number) {
    let done = this.appointments.splice(index, 1)
    this.done_appointments.push(done[0])

    localStorage.setItem('appointments-list', JSON.stringify(this.appointments))
    localStorage.setItem('done-appointments-list', JSON.stringify(this.done_appointments))
  }

  redoTask(index: number) {
    let redo = this.done_appointments.splice(index, 1)
    this.appointments.push(redo[0])

    localStorage.setItem('appointments-list', JSON.stringify(this.appointments))
    localStorage.setItem('done-appointments-list', JSON.stringify(this.done_appointments))
  }

  done_appointments: Appointment[]=[]
  newAppointmentTitle: string = ''
  newAppointmentDate: Date = new Date();

  title: string = 'appointment-list-component'

  current_time: string = 'visiting the dentist'

  appointments: Appointment[]=[];

  splitArray (array: Appointment[], size: number): Appointment[][] {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  }
  

  appointmentPage: Page = { 
    arr: this.splitArray(this.appointments, 200), 
    currentPage: 1
  };

  range(length: number): number[] {
    return Array.from({ length }, (_, i) => i + 1); // Creates an array [1, 2, 3, ..., length]
  }

  constructor(private apiService: ApiServiceService) { 
      setInterval(()=>{ 
        let date: Date = new Date()
        this.current_time = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
      }, 500);

     /* apiService.getPlainTextData().subscribe((data:string)=>{
        var index = 1
        data.split('\n').filter(s=>s.trim().length > 1).forEach(line=> { 
          let newApp: Appointment = {
            title: line,
            date: new Date('2024-09-20'),
            id: index++
          }

          this.appointments.push(newApp)
        })
      });*/
  }
  ngOnInit(): void {
    let savedAppointments = localStorage.getItem('appointments-list')
    this.appointments = savedAppointments ? JSON.parse(savedAppointments): []

    savedAppointments = localStorage.getItem('done-appointments-list')
    this.done_appointments = savedAppointments ? JSON.parse(savedAppointments): []
  }

  addAppointment() { 
    let newApp: Appointment = {
      title: this.newAppointmentTitle,
      date: this.newAppointmentDate,
      id: this.appointments.length+1
    }
    this.appointments.push(newApp)

    localStorage.setItem('appointments-list', JSON.stringify(this.appointments))
    this.newAppointmentTitle=''

    this.newAppointmentDate = new Date('2024-09-20')
  }

  sayHello(name: string) : string { 
    var message =  'Hello, ' + name
    return message
  }
}
