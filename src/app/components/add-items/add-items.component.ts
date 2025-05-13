import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  addPackageItemForm: FormGroup;
  errorMessage: string = ''; // Stores error messages
  itemType: string = '';

  constructor(
    private packageService: PackageService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addPackageItemForm = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.itemType = this.route.snapshot.url[0].path === 'package-items' ? 'Package' : 'Additional';
  }

  onSubmit() {
    console.log(this.addPackageItemForm.value);
    if ((this.itemType === 'Package' && !this.addPackageItemForm.get('name')?.valid) || this.itemType === 'Additional' && !this.addPackageItemForm.valid) {
      return;
    }


    if (this.itemType === 'Package') {
      this.packageService.addPackageItems(
        this.addPackageItemForm.value
      ).subscribe({
        next: (response: any) => {
          console.log('Package item created successfully');
          alert('Package item created successfully');
          this.router.navigate(['/packages']);

        },
        error: (err: any) => {
          console.log('Error Package creation', err);

          this.errorMessage = 'Package creation failed. Try again.';

        }
      });
    } else {
      this.packageService.addPackageItems(
        this.addPackageItemForm.value
      ).subscribe({
        next: (response: any) => {
          console.log('Package item created successfully');
          alert('Package item created successfully');
          this.router.navigate(['/packages']);

        },
        error: (err: any) => {
          console.log('Error Package creation', err);

          this.errorMessage = 'Package creation failed. Try again.';

        }
      });
    }
  }

}








