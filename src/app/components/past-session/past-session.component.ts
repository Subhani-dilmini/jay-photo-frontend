import { Component } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-past-session',
  imports: [CommonModule],
  templateUrl: './past-session.component.html',
  styleUrl: './past-session.component.scss'
})
export class PastSessionComponent {
  pastSessions: any[] = [];
  userId: any;
  role: any;

  constructor(
    private sessionService: SessionService,
    private authService: AuthService,
    private route: ActivatedRoute,

  ) {

  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.role = this.authService.getRole();
    this.getPastSessions();
  }

  getPastSessions() {
    this.sessionService.getPastSessionsByUser(this.userId).subscribe({
      next: data => {
        this.pastSessions = data;
      },
      error: err => {
        console.log(err)
      }
    });
  }
}
