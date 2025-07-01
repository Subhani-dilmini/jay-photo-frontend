import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SessionOptions } from 'http2';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-pending-session-appointments',
  imports: [RouterModule],
  templateUrl: './pending-session-appointments.component.html',
  styleUrl: './pending-session-appointments.component.scss'
})
export class PendingSessionAppointmentsComponent {
 pendingSessions: any[] = [];

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.getPendingSessions();
  }

  getPendingSessions() {
    this.sessionService.getPendingSessions().subscribe({
      next: data => {
        this.pendingSessions = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  confirmSession(meetingId: number) {
    this.sessionService.changeSessionStatus(meetingId, 'CONFIRMED').subscribe({
      next: data => {
        this.getPendingSessions();
      },
      error: err => {
        console.log(err);
      }
    });
  }

  rejectSession(meetingId: number) {
    this.sessionService.changeSessionStatus(meetingId, 'CANCELED').subscribe({
      next: data => {
        this.getPendingSessions();
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
