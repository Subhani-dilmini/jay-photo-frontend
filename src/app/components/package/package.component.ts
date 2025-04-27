import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-package',
  imports: [RouterModule],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit{

  packages: any[] = [];

  constructor(private packageService: PackageService) { }

  ngOnInit() {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
    })
  }
}







