import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio-category',
  imports: [RouterModule],
  templateUrl: './portfolio-category.component.html',
  styleUrl: './portfolio-category.component.scss'
})
export class PortfolioCategoryComponent implements OnInit{
  category: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('id')!;
  }
  


}
