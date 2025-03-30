import { Component } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterModule, 
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent {
  signUpForm: FormGroup ;
  errorMessage: string = ''; // Stores error messages

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
    )
   {
    this.signUpForm = this.formBuilder.group({
      Fname: new FormControl('', Validators.required),
      Lname: new FormControl('', Validators.required),
      Phone: new FormControl('', Validators.required),
      Eaddress: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

   

  onSubmit() {
    /*if(!this.signUpForm.valid){
      return;
    }*/

      if(!this.signUpForm.valid || this.signUpForm.value.Password !== this.signUpForm.value.confirmPassword){
        this.errorMessage = 'Passwords do not match';
        return;
      }
      
    this.authService.signUp(
      this.signUpForm.value.Fname, 
      this.signUpForm.value.Lname, 
      this.signUpForm.value.Phone,
      this.signUpForm.value.Eaddress, 
      this.signUpForm.value.address, 
      this.signUpForm.value.Username, 
      this.signUpForm.value.Password
    ).subscribe({
      next: (response: any) => {
        console.log('User registered successfully');  
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.log('Error signing in', err);

        this.errorMessage = 'Registration failed. Try again.';
        
      }
    });
  }
}
