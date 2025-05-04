import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

 constructor(
  private packageService: PackageService,
  private formBuilder: FormBuilder,
  private router: RouterModule
  ) {
    this.addPackageForm = this.formBuilder.group({
      PackageTitle: new FormControl('', Validators.required),
      Price: new FormControl('', Validators.required),
      items: this.formBuilder.array([this.createItem()])
    });
  }
 
 // List of items with quantity
 itemList: { name: string, quantity: number }[] = [{ name: '', quantity: 1 }];

 ngOnInit() {
  this.packageService.getAvailableItems().subscribe(data => {
    this.availableItems = data;
  })
}

// Create a single item group
createItem(): FormGroup {
  return this.formBuilder.group({
    name: ['', Validators.required],
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

 // Optional: onSubmit method
 onSubmit(): void {
  if (this.addPackageForm.valid) {
    console.log('Form data:', this.addPackageForm.value);
  } else {
    console.log('Form is invalid');
  }
}

}


