import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tasksService } from '../../../services/tasksService/tasksService';
import { task } from '../../../models/task.models';
import { projectsService } from '../../../services/projectsService/projectsService';
import { project } from '../../../models/project.models';
import { LoginService } from '../../../services/loginService/loginService';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatDividerModule, MatTooltipModule, MatSelectModule, MatFormFieldModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.css',
  standalone: true,
})

export class tasks {
  private tasksService = inject(tasksService);
  private projectsService = inject(projectsService);
  private loginService = inject(LoginService);

  tasks = signal<task[]>([]);
  projects = signal<project[]>([]);
  selectedProjectId = signal<string>('');
  currentUserId = this.loginService.currentUser?.id;

  constructor() {
    this.loadProjects();
    this.loadTasks();
  }

  loadProjects() {
    this.projectsService.getprojects()
      .pipe(takeUntilDestroyed())
      .subscribe((data) => this.projects.set(data));
  }

  loadTasks() {
    this.tasksService.gettasks(this.selectedProjectId() || undefined)
      .pipe(takeUntilDestroyed())
      .subscribe((data: task[]) => {
        this.tasks.set(data);
      });
  }

  onProjectFilterChange(projectId: any) {
    this.selectedProjectId.set(projectId);
    this.tasksService.gettasks(projectId || undefined).subscribe((data) => {
      this.tasks.set(data);
    });
  }

  getTasksByStatus(status: string) {
    return this.tasks().filter(t => (t.status || 'Pending').toLowerCase() === status.toLowerCase());
  }

  canEdit(task: task): boolean {
    // Assuming assigne_id is string. currentUserId is number (from model). 
    // Need to handle type coercion.
    return String(task.assignee_id) === String(this.currentUserId);
  }
}
