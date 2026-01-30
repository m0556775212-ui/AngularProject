import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { projectsService } from '../../../services/projectsService/projectsService';
import { addProject } from '../../../models/project.models';
import { TeamsService } from '../../../services/teamsService/teamsService';
import { Team } from '../../../models/teams.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-project',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, RouterLink],
  templateUrl: './add-project.html',
  styleUrl: './add-project.css',
  standalone: true,
})
export class Addproject {
  private fb = inject(FormBuilder);
  private projectsService = inject(projectsService);
  private teamsService = inject(TeamsService);
  isLoading = signal(false);
  private router = inject(Router);
  teams = signal<Team[]>([]);

  projectForm = this.fb.group({
    teamId: ['', [Validators.required]],
    name: ['', [Validators.required]],
  });

  constructor() {
    this.teamsService.getTeams().subscribe({
      next: (data: Team[]) => this.teams.set(data),
      error: (err) => console.error('Error loading teams', err)
    });
  }
  
  addproject(){
    if (this.projectForm.valid) {
      this.isLoading.set(true);
      const formData: addProject = {
        teamId: this.projectForm.value.teamId as string,
        name: this.projectForm.value.name as string
      };
      this.projectsService.Addproject(formData).subscribe({
        next: () => {
          this.isLoading.set(false);
          Swal.fire({
            title: 'Success',
            text: 'Project created successfully',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
          this.router.navigate(['/projects']);
        },
        error: (err) => {
          this.isLoading.set(false);
          console.error('Error adding project:', err);
          Swal.fire('Error', 'Failed to create project', 'error');
        }
      });
    }
  }
}
