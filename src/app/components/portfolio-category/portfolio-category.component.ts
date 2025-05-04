import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService, MyToken } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-portfolio-category',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './portfolio-category.component.html',
  styleUrl: './portfolio-category.component.scss'
})
export class PortfolioCategoryComponent implements OnInit{
  categoryId: string = '';
  category: any;
  addAlbumForm: FormGroup ;
  errorMessage: string = ''; // Stores error messages
  myToken: MyToken | null = null;
  role: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private uploadService: FileUploadService
  )
  {
    this.addAlbumForm = this.formBuilder.group({
      albumName: new FormControl('', Validators.required),
      publishedDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.getAlbumList();
    this.role = this.authService.getRole();
  }
  
  getAlbumList() {
    this.portfolioService.getAlbumsByCategoryId(parseInt(this.categoryId)).subscribe(data => {
      this.category = data;
      this.category.albums.forEach((album: any) => {
        this.getCategoryImage(album.albumName).then(data => album.albumImage = data);
      })

    })
  }

  async getCategoryImage(customName: string): Promise<any> {
    return await this.uploadService.getFileUrlByFileName(customName, 'images/portfolio/category/' + this.categoryId);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadService.uploadOrReplaceFile('Hiran & Nathasha', file, 'images/portfolio/category/' + this.categoryId).then(url => {
        console.log('File uploaded! URL:', url);
      });
    }
  }
  

  onSubmit() {
    /*if(!this.signUpForm.valid){
      return;
    }*/

      console.log("working");
      if(!this.addAlbumForm.valid ){
        return;
      }

    this.portfolioService.addAlbum(
      this.addAlbumForm.value, Number(this.categoryId)
    ).subscribe({
      next: (response: any) => {
        console.log('Album created successfully');  
        this.getAlbumList()
      },
      error: (err: any) => {
        console.log('Error album creation', err);

        this.errorMessage = 'Album creation failed. Try again.';
        
      }
    });
  }

  onUploadImage(albumId: string) {

  }

  onChangeImage(albumId: string) {

  }

  onDeleteAlbum(albumId: string) {

  }

}
