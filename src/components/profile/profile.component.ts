import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NavbarComponent,
    FooterComponent,
    RouterLink,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  user: any = undefined;
  isUserLoaded: boolean = false;

  // Profile form
  profileForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.minLength(6), Validators.required]],
  });

  get name() {
    return this.profileForm.controls['name'];
  }
  get email() {
    return this.profileForm.controls['email'];
  }
  get password() {
    return this.profileForm.controls['password'];
  }

  successMessage: null | string = null;

  updateProfile() {
    this.profileForm.markAllAsTouched();
    this.authService.editProfile(this.profileForm.value).subscribe({
      next: (res) => {
        this.successMessage = 'تم تعديل الملف الشخصي بنجاح.';

        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      let id = localStorage.getItem('id');
      this.authService.getUser(id).subscribe({
        next: (res) => {
          console.log(res);
          this.user = res;
        },
        complete: () => {
          this.isUserLoaded = true;
        },
      });
    }
  }
}
