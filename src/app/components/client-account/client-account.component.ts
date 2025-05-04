import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';

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
  imageUrl: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private uploadService: FileUploadService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.role = this.authService.getRole();
    this.getUserDetails();
    this.getCategoryImage().then(data => this.imageUrl = data);
  }

  getUserDetails() {
    this.userService.getUserDetails(this.userId).subscribe(data => {
      this.userDetails = data;

    })
  }

  async getCategoryImage(): Promise<any> {
    return await this.uploadService.getFileUrlByFileName(this.userId, 'images/user');
  }

}
