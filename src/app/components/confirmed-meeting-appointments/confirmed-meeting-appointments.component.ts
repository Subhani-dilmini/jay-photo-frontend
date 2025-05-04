import { Component } from '@angular/core';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-confirmed-meeting-appointments',
  imports: [],
  templateUrl: './confirmed-meeting-appointments.component.html',
  styleUrl: './confirmed-meeting-appointments.component.scss'
})
export class ConfirmedMeetingAppointmentsComponent {
  confirmedMeetings: any[] = [];

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    this.getConfirmedMeetings();
  }

  getConfirmedMeetings() {
    this.meetingService.getConfirmedMeetings().subscribe({
      next: data => {
        this.confirmedMeetings = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

}
