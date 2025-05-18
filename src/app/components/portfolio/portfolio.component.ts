import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule, NgFor } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService, MyToken } from '../../services/auth.service';

@Component({
  selector: 'app-portfolio',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss'
})
export class PortfolioComponent implements OnInit {
  //global variable to store the portfolio data to be displayed in the template(html)
  portFolio: any[] = [];
  imageRefs: any[] = [];
  category: any;
  addCategoryForm: FormGroup ;
  file: File | null = null;
  role: any;
  errorMessage: string = ''; // Stores error messages

  constructor(
    private portfolioService: PortfolioService,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,    
    private uploadService: FileUploadService,
    private authService: AuthService,
    ) 
    { 
      this.addCategoryForm = this.formBuilder.group({
        categoryName: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
    this.role = this.authService.getRole();
    this.getCategoryList();

  }


  getCategoryList() {
    this.portfolioService.getPortfolios().subscribe(data => {
      this.portFolio = data;
        this.portFolio.forEach(portfolio => {
          this.getCategoryImage(portfolio.categoryName).then(data => portfolio.categoryImage = data);
        })

    })
  }
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    /*if(!this.signUpForm.valid){
      return;
    }*/

      console.log("working");
      if(!this.addCategoryForm.valid ){
        return;
      }

    this.portfolioService.addCategory(
      this.addCategoryForm.value
    ).subscribe({
      next: (response: any) => {
        console.log('Category created successfully');
        if (this.file) {
          this.uploadService.uploadOrReplaceFile(this.addCategoryForm.get('categoryName')?.value, this.file, 'images/portfolio/category').then(url => {
            this.getCategoryList();
            console.log('File uploaded! URL:', url);
          });
        }else {
          this.getCategoryList();
        }
      },
      error: (err: any) => {
        console.log('Error album creation', err);

        this.errorMessage = 'Album creation failed. Try again.';
        
      }
    });
  }
  getPortfolios() {

  }

  getCategory() {

  }

  async getCategoryImage(customName: string): Promise<any> {
    return await this.fileUploadService.getFileUrlByFileName(customName, 'images/portfolio/category');
  }


}
