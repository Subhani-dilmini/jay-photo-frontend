import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-confirmed-session-appointments',
  imports: [],
  templateUrl: './confirmed-session-appointments.component.html',
  styleUrl: './confirmed-session-appointments.component.scss'
})
export class ConfirmedSessionAppointmentsComponent {
  confirmedSessions: any[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getConfirmedSessions();
  }

  getConfirmedSessions() {
    this.sessionService.getConfirmedSessions().subscribe({
      next: data => {
        this.confirmedSessions = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
