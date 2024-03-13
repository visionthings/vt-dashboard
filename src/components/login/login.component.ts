import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  // Login Form
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }

  errorMessage: string | null = null;

  login() {
    this.loginForm.markAllAsTouched();
    this.authService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.user.roles.length === 0) {
          this.errorMessage = 'ليس لديك صلاحية الدخول للوحة التحكم';
        } else {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', res.token);

            for (const i in res.user) {
              localStorage.setItem(i, res.user[i]);
            }
          }
          this.authService.handleAuth();
          this.router.navigateByUrl('/dashboard');
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      },
    });
  }
}
