import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-add-items',
  imports: [
    FormsModule, 
    RouterModule, 
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.scss'
})
export class AddItemsComponent {
  addPackageItemForm : FormGroup;
  errorMessage: string = ''; // Stores error messages

  constructor(
    private packageService: PackageService,
    private formBuilder: FormBuilder,
    private router: Router
    ) {
      this.addPackageItemForm = this.formBuilder.group({
        PackageItemName: new FormControl('', Validators.required),
        Price: new FormControl('', Validators.required)
      });
    }

    ngOnInit() {
      // Initialize any data if needed
    }

    onSubmit() {
      if(!this.addPackageItemForm.valid ){
        return;
      }
  
    this.packageService.addPackage(
      this.addPackageItemForm.value
    ).subscribe({
      next: (response: any) => {
        console.log('Package item created successfully');
        this.router.navigate(['/packages']);
        
      },
      error: (err: any) => {
        console.log('Error Package creation', err);
  
        this.errorMessage = 'Package creation failed. Try again.';
        
      }
    });
  }

}








