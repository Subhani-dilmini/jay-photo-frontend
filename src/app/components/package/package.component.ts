import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { CommonModule, NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-package',
  imports: [RouterModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit{

  packages: any[] = [];
  role: any;

  constructor(private packageService: PackageService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
    })
    
    this.role = this.authService.getRole();
  }
}







