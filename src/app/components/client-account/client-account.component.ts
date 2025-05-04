import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-client-account',
  imports: [RouterModule],
  templateUrl: './client-account.component.html',
  styleUrl: './client-account.component.scss'
})
export class ClientAccountComponent implements OnInit {
  role: any;
  userId: any;
  userDetails: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.role = this.authService.getRole();
    this.getUserDetails();
  }

  getUserDetails() {
    this.userService.getUserDetails(this.userId).subscribe(data => {
      this.userDetails = data;

    })
  }

}
