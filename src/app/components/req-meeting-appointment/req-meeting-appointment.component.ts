import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MeetingService } from '../../services/meeting.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-req-meeting-appointment',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './req-meeting-appointment.component.html',
  styleUrl: './req-meeting-appointment.component.scss'
})
export class ReqMeetingAppointmentComponent implements OnInit {
  meetingForm : FormGroup;
  userId: any;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { 
    this.meetingForm = this.formBuilder.group({
        userId: new FormControl('', Validators.required),
        date: new FormControl('', Validators.required),
        time: new FormControl('', Validators.required),
        meetingMode: new FormControl('', Validators.required),
        event: new FormControl('', Validators.required),
        place: new FormControl('test', Validators.required)
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.meetingForm.controls['userId'].setValue(this.userId);
  }

  onSubmit() {
    console.log(this.meetingForm.value);
    if(!this.meetingForm.valid){
      return;
    }

    this.meetingService.addMeeting(this.meetingForm.value).subscribe({
      next: (response) => {
        this.router.navigate(['/upcoming-meeting-appointments', this.userId]);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
