import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { project } from '../../../models/project.models';
import { projectsService } from '../../../services/projectsService/projectsService';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router'; 
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, MatCardModule, MatListModule, MatIconModule, MatChipsModule, MatButtonModule, RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  standalone: true,
})

export class projects {
  private projectsService = inject(projectsService);

  projects = signal<project[]>([]);

  constructor() {
    this.projectsService.getprojects()
      .pipe(takeUntilDestroyed())
      .subscribe((data: project[]) => {
        this.projects.set(data);
      });
  }
}
