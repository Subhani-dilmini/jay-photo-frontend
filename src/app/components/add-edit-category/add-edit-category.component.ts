import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';
import { CommonModule, NgFor } from '@angular/common';
import { FileUploadService } from '../../services/file-upload.service';
import { AuthService, MyToken } from '../../services/auth.service';

@Component({
  selector: 'app-add-edit-category',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-edit-category.component.html',
  styleUrl: './add-edit-category.component.scss'
})
export class AddEditCategoryComponent implements OnInit {
addEditCategoryForm: FormGroup ;
file: File | null = null;
  role: any;
  errorMessage: string = ''; // Stores error messages
  categoryId: any = '';
  CategoryDetails: any;


  constructor(
    private portfolioService: PortfolioService,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,    
    private uploadService: FileUploadService,
    private authService: AuthService,
    ) 
    { 
      this.addEditCategoryForm = this.formBuilder.group({
        categoryName: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('id')!;
    this.role = this.authService.getRole();
    this.getCategoryDetails();
    this.addEditCategoryForm = this.formBuilder.group({
      categoryName: new FormControl('', Validators.required)
    });

  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit() {
    /*if(!this.signUpForm.valid){
      return;
    }*/

      console.log("working");
      if(!this.addEditCategoryForm.valid ){
        return;
      }

    this.portfolioService.addCategory(
      this.addEditCategoryForm.value
    ).subscribe({
      next: (response: any) => {
        console.log('Category created successfully');
        if (this.file) {
          this.uploadService.uploadOrReplaceFile(this.addEditCategoryForm.get('categoryName')?.value, this.file, 'images/portfolio/category').then(url => {
           console.log('File uploaded! URL:', url);
          });
        }else {
        
        }
      },
      error: (err: any) => {
        console.log('Error album creation', err);

        this.errorMessage = 'Album creation failed. Try again.';
        
      }
    });
  }

  getCategoryDetails(){
    this.portfolioService.getCategoryDetails(this.categoryId).subscribe(data => {
      this.CategoryDetails = data;
      this.addEditCategoryForm.patchValue({
        categoryName: this.CategoryDetails.categoryName
      });
  })

}
}
