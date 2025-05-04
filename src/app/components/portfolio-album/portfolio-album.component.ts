import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-portfolio-album',
  imports: [RouterModule],
  templateUrl: './portfolio-album.component.html',
  styleUrl: './portfolio-album.component.scss'
})
export class PortfolioAlbumComponent implements OnInit {
  albumId: string = '';
  album: any;
  role: any;

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit() {
    this.albumId = this.route.snapshot.paramMap.get('id')!;
    this.portfolioService.getAlbumById(parseInt(this.albumId)).subscribe(data => {
      this.album = data;
      this.getAllImages().then(data => this.album.images = data);
    })
    this.role = this.authService.getRole();
  }

  async getAllImages(): Promise<any> {
    return await this.fileUploadService.listAllFiles('images/portfolio/album/' + this.albumId);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploadService.uploadOrReplaceFile(file.name, file, 'images/portfolio/album/' + this.albumId).then(url => {
        this.album.images.push(url);
      });
    }
  }

  onDeleteImage(image: any) {
    this.fileUploadService.deleteFileByDownloadUrl(image).then(() => {
      this.album.images = this.album.images.filter((img: any) => img !== image);
      console.log('Image deleted successfully');
    })

  }
}
