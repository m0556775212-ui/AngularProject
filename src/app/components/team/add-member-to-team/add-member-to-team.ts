import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../../services/teamsService/teamsService';
import { Router, RouterLink } from '@angular/router';
import { Users } from '../../../services/user/users';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-member-to-team',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatButtonModule, RouterLink],
  templateUrl: './add-member-to-team.html',
  styleUrl: './add-member-to-team.css',
  standalone: true,
})
export class AddMemberToTeam {
  private fb = inject(FormBuilder);
  private teamsService = inject(TeamsService);
  private usersService = inject(Users);
  private router = inject(Router);

  isLoading = signal(false);
  teamId = input.required<string>();
  
  users = toSignal(this.usersService.getUsers(), { initialValue: [] });

  memberForm = this.fb.group({
    userId: ['', [Validators.required]],
  });

  addMemberToTeam() {
    if (this.memberForm.valid) {
      this.isLoading.set(true);
      const userId = this.memberForm.value.userId as string;
      
      this.teamsService.AddMemberToTeam(this.teamId(), userId).subscribe({
        next: () => {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Success',
            text: 'Member added successfully',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/teams']);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Error adding member:', err);
          Swal.fire({
            title: 'Error',
            text: 'Failed to add member',
            icon: 'error'
          });
        }
      });
    }
  }
}
