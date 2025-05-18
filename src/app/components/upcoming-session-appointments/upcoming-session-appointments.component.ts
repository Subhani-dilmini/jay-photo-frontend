import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Session } from 'inspector';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { CommonModule } from '@angular/common';
import { PayHereService } from '../../services/pay-here.service';

@Component({
  selector: 'app-upcoming-session-appointments',
  imports: [RouterModule, CommonModule],
  templateUrl: './upcoming-session-appointments.component.html',
  styleUrl: './upcoming-session-appointments.component.scss'
})
export class UpcomingSessionAppointmentsComponent {

  upcommingSessions: any[] = [];
  userId: any;
  role: any;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private payHereService: PayHereService
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.role = this.authService.getRole();
    this.getUpcomingSessions();
  }


  getUpcomingSessions() {
    this.sessionService.getUpcomingSessionsByUser(this.userId).subscribe({
      next: data => {
        this.upcommingSessions = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  payNow(session: any) {
    const paymentData = {
      sandbox: true,  // Keep this as true for sandbox mode
      merchant_id: '1230444',  // Your correct Sandbox Merchant ID from PayHere Dashboard
      return_url: 'http://localhost:4200/my-account',
      cancel_url: 'http://localhost:4200/upcoming-session-appointments/1',
      notify_url: 'http://localhost:4200/my-account',
      order_id: session.sessionId,
      items: session.aPackage.name,
      amount: session.amount,  // Ensure it's a string and formatted correctly
      currency: 'LKR',
      first_name: 'Hiran',
      last_name: 'Thenuwara',
      email: 'hiran@example.com',
      phone: '0771234567',
      address: 'No. 123, Galle Road, Colombo',
      city: 'Colombo',
      country: 'Sri Lanka',
      iframe: true  // Optional: Use iframe mode for a better UI
    };


    this.payHereService.initiatePayment(paymentData);
  }
}
