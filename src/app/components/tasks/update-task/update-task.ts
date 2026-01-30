import { Component, signal, OnInit, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { task } from '../../../models/task.models';
import { tasksService } from '../../../services/tasksService/tasksService';
import { Users } from '../../../services/user/users'; // Import Users service
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select'; // Import MatSelect
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.html',
  styleUrl: './update-task.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule // Add Module
  ]
})
export class UpdateTask implements OnInit {

  private fb = inject(FormBuilder);
  private updateTaskService = inject(tasksService);
  private usersService = inject(Users); // Inject Users Service
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isLoading = signal(false);
  users = toSignal(this.usersService.getUsers(), { initialValue: [] }); // Load Users

  taskId!: string;
  currentTask!: task;

  updateTaskForm = this.fb.group({
    title: [''],
    description: [''],
    status: [''],
    priority: [''],
    assignee_id: [''],
    due_date: [''],
    order_index: ['']
  });

  ngOnInit() {

    this.taskId = String(this.route.snapshot.paramMap.get('id'));

    this.loadTask();
  }

  loadTask() {

    this.isLoading.set(true);

    this.updateTaskService.gettasks()
      .subscribe({
        next: (tasks: task[]) => {
          const found = tasks.find(t => String(t.id) === String(this.taskId));

          if (!found) {
            console.error('Task not found with ID:', this.taskId);
            this.isLoading.set(false);
            Swal.fire('Error', 'Task not found!', 'error');
            this.router.navigate(['/tasks']);
            return;
          }

          this.currentTask = found;

          let formattedDate = found.due_date;
          if (found.due_date && typeof found.due_date === 'string' && found.due_date.includes('T')) {
              formattedDate = found.due_date.split('T')[0];
          }

          this.updateTaskForm.patchValue({
            title: found.title,
            description: found.description,
            status: found.status,
            priority: found.priority,
            assignee_id: found.assignee_id,
            due_date: formattedDate,
            order_index: found.order_index
          });

          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load tasks', err);
          this.isLoading.set(false);
          Swal.fire('Error', 'Failed to load task details', 'error');
        }
      });
  }

  updateTask() {

    if (this.updateTaskForm.invalid) return;

    const updateObject: task = {
        ...this.currentTask,
        ...this.updateTaskForm.value,
        updated_at: new Date()
    } as task;
    this.updateTaskService.updateTask(
      this.taskId,
      updateObject
    ).subscribe({
      next: () => {
        Swal.fire({
          title: 'Success',
          text: 'Task updated successfully',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Update failed', err);
        Swal.fire('Error', 'Failed to update task', 'error');
      }
    });
  }
}
