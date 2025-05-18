import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [MatButtonModule, MatMenuModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit {

  role: any;
  isLogged = false;
  constructor(private authService: AuthService) { }

  //ngOnInit -> This is a lifecycle hook in Angular that gets called once the component is initialized.
  ngOnInit(): void {
    this.authService.isLogged.subscribe((logged: boolean) => {
      this.isLogged = logged;
    });
    this.role = this.authService.getRole();
  }

  logOut() { 
    this.authService.logout();
  }

  
}


