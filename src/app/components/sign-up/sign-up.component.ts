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
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

   

  onSubmit() {
    /*if(!this.signUpForm.valid){
      return;
    }*/

      if(!this.signUpForm.valid || this.signUpForm.value.password !== this.signUpForm.value.confirmPassword){
        this.errorMessage = 'Passwords do not match';
        return;
      }
      
    this.authService.signUp(
      this.signUpForm.value.firstName, 
      this.signUpForm.value.lastName, 
      this.signUpForm.value.phoneNumber,
      this.signUpForm.value.email, 
      this.signUpForm.value.email, 
      this.signUpForm.value.username, 
      this.signUpForm.value.password
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
