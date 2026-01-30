import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { tasksService } from '../../../services/tasksService/tasksService';
import { AddTask } from '../../../models/task.models';
import { projectsService } from '../../../services/projectsService/projectsService';
import { project } from '../../../models/project.models';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-add-task',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './add-task.html',
  styleUrl: './add-task.css',
  standalone: true,
})
export class Addtask {
  private fb = inject(FormBuilder);
  private tasksService = inject(tasksService);
  isLoading = signal(false);
  private router = inject(Router);
  
  private projectService = inject(projectsService);
  projects = signal<project[]>([]);
  
  taskForm = this.fb.group({
    projectId: ['', [Validators.required]],
    title: ['', [Validators.required]],
    description: [''],
    priority: ['Medium', [Validators.required]],
    status: ['Pending', [Validators.required]],
    dueDate: ['']
  });

  constructor() {
    this.projectService.getprojects().subscribe((data: project[]) => {
      this.projects.set(data);
    });
  }
  
  addtask(){
    if (this.taskForm.valid) {
      this.isLoading.set(true);
      const val = this.taskForm.value;
      const formData: AddTask = {
        projectId: String(val.projectId),
        title: val.title!,
        description: val.description || '',
        priority: val.priority || 'Medium',
        status: val.status || 'Pending',
        dueDate: val.dueDate ? new Date(val.dueDate).toISOString() : undefined
      };
      
      this.tasksService.Addtask(formData).subscribe(() => {
        this.isLoading.set(false);
        this.router.navigate(['/tasks']);
      });
    }
  }
}
