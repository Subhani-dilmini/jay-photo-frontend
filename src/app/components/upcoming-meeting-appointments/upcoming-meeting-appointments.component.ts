import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MeetingService } from '../../services/meeting.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upcoming-meeting-appointments',
  imports: [RouterModule],
  templateUrl: './upcoming-meeting-appointments.component.html',
  styleUrl: './upcoming-meeting-appointments.component.scss'
})
export class UpcomingMeetingAppointmentsComponent implements OnInit{
  upcommingMeetings: any[] = [];
  userId: any;
  role: any;
 

  constructor(
    private meetingService: MeetingService,
    private authService: AuthService,
    private route : ActivatedRoute,
    
  ) { 
    
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.role = this.authService.getRole();
    this.getPendingMeetings();
  }

  getPendingMeetings() {
    this.meetingService.getPendingMeetingsByUser(this.userId).subscribe({
      next: data => {
        this.upcommingMeetings = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }  

}
