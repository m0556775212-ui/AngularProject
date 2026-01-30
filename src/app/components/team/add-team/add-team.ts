import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../../services/teamsService/teamsService';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-team',
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-team.html',
  styleUrl: './add-team.css',
  standalone: true,
})
export class AddTeam {
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);
  isLoading = signal(false);
  private router = inject(Router);
  teamForm = this.fb.group({
    name: ['', [Validators.required]],
  });
  
  addTeam() {
    if (this.teamForm.valid) {
      this.isLoading.set(true);
      const name = this.teamForm.value.name as string;
      this.teamsService.AddTeam(name).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Error adding team:', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to add team',
            icon: 'error'
          });
        }
      });
    }
  }
}
