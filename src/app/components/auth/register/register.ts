import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../../services/loginService/loginService';
import { UserRegister } from '../../../models/auth.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  isLoading = signal(false);

  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });

  register(){
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      const formData = this.registerForm.value;
      this.loginService.register(formData as UserRegister).subscribe({
        next: () => {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Success',
            text: 'Registration successful! Logging in...',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Registration failed', err);
          const errorMessage = err.error?.message || err.statusText || 'Unknown error';
          Swal.fire({
            title: 'Registration failed',
            text: `(Status: ${err.status}): ${errorMessage}`,
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        },
      });
    }
  }
}
