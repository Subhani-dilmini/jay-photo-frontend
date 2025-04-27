import { Component , OnInit} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-portfolio-album',
  imports: [RouterModule],
  templateUrl: './portfolio-album.component.html',
  styleUrl: './portfolio-album.component.scss'
})
export class PortfolioAlbumComponent implements OnInit{
  albumId: string = '';
  album: any;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  ) {}

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    this.portfolioService.getAlbumById(parseInt(this.albumId)).subscribe(data => {
      this.album = data;
    })

}
}
