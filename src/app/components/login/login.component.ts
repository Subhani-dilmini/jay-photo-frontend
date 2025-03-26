import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if(!this.loginForm.valid){
      return;
    }
    this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: (token: any) => {
        localStorage.setItem('token', token);
        this.authService.setLogged();
        this.router.navigate(['']);
      },
      error: (err: any) => {
        console.log('Error logging in');
      }
    });
  }
}
