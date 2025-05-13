import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PackageService } from '../../services/package.service';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-req-sessoin-appointment',
  imports: [RouterModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './req-sessoin-appointment.component.html',
  styleUrl: './req-sessoin-appointment.component.scss'
})
export class ReqSessoinAppointmentComponent implements OnInit {
  packages: any[] = [];
  sessionForm: FormGroup;
  selectedPackage: any;
  availableItems: any[] = [];
  userId: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private packageService: PackageService,
    private authService: AuthService,
    private sessionService: SessionService,
    private formBuilder: FormBuilder
  ) {
    this.sessionForm = this.formBuilder.group({
      userId: ['', [Validators.required]],
      photographyPackage: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      place: ['', [Validators.required]],
      event: ['', [Validators.required]],
      amount: [{ value: 0, disabled: true }, [Validators.required]],
      additionalItems: this.formBuilder.array([this.createItem()])
    })
  }


  ngOnInit() {
    console.log(this.selectedPackage);
    this.userId = this.route.snapshot.paramMap.get('id') || this.authService.getCurrentUserId();
    this.sessionForm.controls['userId'].patchValue(this.userId);
    this.getAllPackages();
    this.getAllAdditionalItems();
    this.amountChange(); 
  }

  // List of items with quantity
  itemList: { item: string, quantity: number }[] = [{ item: '', quantity: 1 }];

  // Create a single item group
  createItem(): FormGroup {
    return this.formBuilder.group({
      item: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  // Access items as FormArray
  get items(): FormArray {
    return this.sessionForm.get('additionalItems') as FormArray;
  }

  getAvailableItems() {

  }

  // Add new item to items array
  addItem(): void {
    this.items.push(this.createItem());
  }

  amountChange() {
    this.sessionForm.get('additionalItems')?.valueChanges.subscribe(data => {
      this.setTotalAmount();
    });

    this.sessionForm.get('photographyPackage')?.valueChanges.subscribe(data => {
      console.log(data);
      this.selectedPackage = data;
      this.setTotalAmount();
    })
  }

  setTotalAmount() {
    let totalAmount = this.selectedPackage.price;
    console.log(totalAmount);

    this.sessionForm.get('additionalItems')?.value.forEach((item: any) => {
      console.log(item);
      if(item.item !== '') {
        totalAmount += item.item.price * item.quantity;
      }
    });

    this.sessionForm.get('amount')?.patchValue(totalAmount);
  }

  getAllPackages() {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
      if (this.route.snapshot.queryParamMap.get('packageId')) {
        this.selectedPackage = this.packages.find(p => p.packageId === Number(this.route.snapshot.queryParamMap.get('packageId')));
        this.sessionForm.patchValue({ photographyPackage: this.selectedPackage });
        this.sessionForm.patchValue({ amount: this.selectedPackage.price });
      }
    });
  }

  getAllAdditionalItems() {
    this.packageService.getAdditionalItems().subscribe(data => {
      this.availableItems = data;
    });
  }

  onSubmit() {
    this.sessionForm.get('amount')?.enable();
    console.log(this.sessionForm.value);
    this.sessionService.addSession(this.sessionForm.value).subscribe({
      next: () => {
        this.router.navigate(['/upcoming-session-appointments']);
      },
      error: err => {
        console.log(err);
      }
    })
    this.sessionForm.get('amount')?.disable();
  }

}
