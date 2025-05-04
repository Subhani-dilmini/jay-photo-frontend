import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  selector: 'app-edit-profile',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  editProfileForm: FormGroup;
  userDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadService: FileUploadService
  ) { 
    this.editProfileForm = this.formBuilder.group({
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    this.userDetails = this.authService.decodeToken();
    console.log(this.userDetails);
    this.editProfileForm.patchValue({
      phoneNumber: this.userDetails.phoneNumber,
      email: this.userDetails.email,
      address: this.userDetails.address
    })
  }

  async getCategoryImage(): Promise<any> {
    return await this.uploadService.getFileUrlByFileName(this.editProfileForm.get('id')?.value, 'images/user');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadService.uploadOrReplaceFile(this.userDetails.id, file, 'images/user').then(url => {
        
      });
    }
  }

  
}
