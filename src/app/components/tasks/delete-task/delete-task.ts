import { Component, inject, OnInit } from '@angular/core';
import { tasksService } from '../../../services/tasksService/tasksService';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-task',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './delete-task.html',
  styleUrl: './delete-task.css',
  standalone: true,
})
export class DeleteTask implements OnInit {
  private taskId: string = '';
  private deleteTaskService = inject(tasksService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    this.taskId = String(this.route.snapshot.paramMap.get('id'));
  }
  deleteTask() {
    this.deleteTaskService.deleteTask(this.taskId).subscribe({
      next: () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Task has been deleted.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Error', 'Failed to delete task', 'error');
      }
    });
  }
}
