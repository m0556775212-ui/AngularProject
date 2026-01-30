import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/loginService/loginService';
import { UserLogin } from '../../../models/auth.models';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  isLoading = signal(false);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  login() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const formData = this.loginForm.value;
      this.loginService.login(formData as UserLogin).subscribe({
        next: () => {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Welcome!',
            text: 'Login successful',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Login failed', err);
          const errorMessage = err.error?.message || err.statusText || 'Unknown error';
          Swal.fire({
            title: 'Login Failed',
            text: `(Status: ${err.status}): ${errorMessage}`,
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        },
      });
    }
  }
}