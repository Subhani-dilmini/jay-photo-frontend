import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule, NgFor } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-portfolio',
  imports: [RouterModule, CommonModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  //global variable to store the portfolio data to be displayed in the template(html)
  portFolio: any[] = [];
  imageRefs: any[] = [];

  constructor(
    private portfolioService: PortfolioService,
    private fileUploadService: FileUploadService) { }

  ngOnInit() {
    this.portfolioService.getPortfolios().subscribe(data => {
      this.portFolio = data;
        this.portFolio.forEach(portfolio => {
          this.getCategoryImage(portfolio.categoryName).then(data => portfolio.categoryImage = data);
        })

    })
  }

  getPortfolios() {

  }

  getCategory() {

  }

  async getCategoryImage(customName: string): Promise<any> {
    return await this.fileUploadService.getFileUrlByFileName(customName, 'images/portfolio/category');
  }


}
