import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-category',
  imports: [RouterModule],
  templateUrl: './portfolio-category.component.html',
  styleUrl: './portfolio-category.component.scss'
})
export class PortfolioCategoryComponent implements OnInit{
  categoryId: string = '';
  category: any;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.portfolioService.getAlbumsByCategoryId(parseInt(this.categoryId)).subscribe(data => {
      this.category = data;
    })
  }
  


}
