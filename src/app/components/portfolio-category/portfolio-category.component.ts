import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PortfolioService } from '../../services/portfolio.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private portfolioService: PortfolioService
  )
  {
    this.addAlbumForm = this.formBuilder.group({
      albumName: new FormControl('', Validators.required),
      publishedDate: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this. getAlbumList();
  }
  
  getAlbumList() {
    this.portfolioService.getAlbumsByCategoryId(parseInt(this.categoryId)).subscribe(data => {
      this.category = data;
    })
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
        console.log('User registered successfully');  
        this.getAlbumList()
      },
      error: (err: any) => {
        console.log('Error album creation', err);

        this.errorMessage = 'Album creation failed. Try again.';
        
      }
    });
  }

}
