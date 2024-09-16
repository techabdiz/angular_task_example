import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'appointment-app';
  toggle = true;

  clicked = ()=> { 
    this.toggle = !this.toggle 
    this.title = (this.toggle)?'appointment-app':'some other app'
  }
}
