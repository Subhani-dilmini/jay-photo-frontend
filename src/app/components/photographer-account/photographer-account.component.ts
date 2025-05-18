import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MeetingService } from '../../services/meeting.service';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-photographer-account',
  imports: [RouterModule],
  templateUrl: './photographer-account.component.html',
  styleUrl: './photographer-account.component.scss'
})
export class PhotographerAccountComponent implements OnInit{
  customerList: any[] = [];
  selectedCustomer: any = "null";
  pendingMeetingCount: number = 0;
  confirmedMeetingCount: number = 0;

  constructor(
    private userService: UserService,
    private meetingService: MeetingService,
    private pdfService: PdfService
  ) {}

  ngOnInit() {
    this.getAllCustomers();
    this.getPendingMeetingCount();
    this.getconfirmedMeetingCount();
  }

  getAllCustomers() {
    this.userService.getAllCustomers().subscribe({
      next: data => {
        this.customerList = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  getPendingMeetingCount() {
    this.meetingService.getPendingMeetingCount().subscribe({
      next: data => {
        this.pendingMeetingCount = data.count;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  getconfirmedMeetingCount() {
    this.meetingService.getConfirmedMeetingCount().subscribe({
      next: data => {
        this.confirmedMeetingCount = data.count;
      },
      error: err => {
        console.log(err)
      }
    });
  }

  downloadPdf() {
    this.pdfService.generatePdf('dashboard-content', 'Appointment_Report');
  }

  selectCustomer(customer: any) {
    this.selectedCustomer = customer.target.value;
  }

}
