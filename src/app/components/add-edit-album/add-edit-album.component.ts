import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';
import { AuthService, MyToken } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-add-edit-album',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './add-edit-album.component.html',
  styleUrl: './add-edit-album.component.scss'
})
export class AddEditAlbumComponent implements OnInit{
  categoryId: string = '';
  albumId: string = '';
  album: any;
   role: any;
  file: File | null = null;
  myToken: MyToken | null = null;
  addEditAlbumForm: FormGroup ;
  errorMessage: string = ''; // Stores error messages'

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private uploadService: FileUploadService
  )
  {
    this.addEditAlbumForm = this.formBuilder.group({
      albumName: new FormControl('', Validators.required),
      publishedDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.role = this.authService.getRole();
  }

   onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

}
