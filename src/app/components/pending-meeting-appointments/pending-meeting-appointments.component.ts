import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MeetingService } from '../../services/meeting.service';

@Component({
  selector: 'app-pending-meeting-appointments',
  imports: [RouterModule],
  templateUrl: './pending-meeting-appointments.component.html',
  styleUrl: './pending-meeting-appointments.component.scss'
})
export class PendingMeetingAppointmentsComponent implements OnInit{
  pendingMeetings: any[] = [];

  constructor(private meetingService: MeetingService) { }

  ngOnInit() {
    this.getPendingMeetings();
  }

  getPendingMeetings() {
    this.meetingService.getPendingMeetings().subscribe({
      next: data => {
        this.pendingMeetings = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  confirmMeeting(meetingId: number) {
    this.meetingService.changeMeetingStatus(meetingId, 'CONFIRMED').subscribe({
      next: data => {
        this.getPendingMeetings();
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
