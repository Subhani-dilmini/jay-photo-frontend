import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-portfolio',
  imports: [RouterModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit{
  portFolio: any[] = [];

  constructor(private portfolioService: PortfolioService) { }

  ngOnInit() {
    this.portfolioService.getPortfolios().subscribe(data => {
      this.portFolio = data;
    })
  }

  getPortfolios() {
    
  }

  
}
