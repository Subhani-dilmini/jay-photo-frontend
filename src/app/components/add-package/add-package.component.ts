import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule, FormArray, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PackageService } from '../../services/package.service';

@Component({
  selector: 'app-add-package',
  standalone: true,
  imports: [
    FormsModule, 
    RouterModule, 
    CommonModule, 
    ReactiveFormsModule
  ],
  templateUrl: './add-package.component.html',
  styleUrl: './add-package.component.scss'
})

export class AddPackageComponent {
 addPackageForm: FormGroup ;
 PackageTitle: string = '';
 Price: string = '';
 availableItems: any[] = [];
 errorMessage: string = ''; // Stores error messages

 constructor(
  private packageService: PackageService,
  private formBuilder: FormBuilder,
  private router: Router
  ) {
    this.addPackageForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      items: this.formBuilder.array([this.createItem()])
    });
  }
 
 // List of items with quantity
 itemList: { itemName: string, quantity: number }[] = [{ itemName: '', quantity: 1 }];

 ngOnInit() {
  this.packageService.getAvailableItems().subscribe(data => {
    this.availableItems = data;
  })
}

// Create a single item group
createItem(): FormGroup {
  return this.formBuilder.group({
    itemName: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]]
  });
}

  // Access items as FormArray
  get items(): FormArray {
    return this.addPackageForm.get('items') as FormArray;
  }

getAvailableItems(){

}

 // Add new item to items array
 addItem(): void {
  this.items.push(this.createItem());
}

onSubmit() {
    if(!this.addPackageForm.valid ){
      return;
    }

  this.packageService.addPackage(
    this.addPackageForm.value
  ).subscribe({
    next: (response: any) => {
      console.log('Package created successfully');
      this.router.navigate(['/packages']);
      
    },
    error: (err: any) => {
      console.log('Error Package creation', err);

      this.errorMessage = 'Package creation failed. Try again.';
      
    }
  });
}

}


