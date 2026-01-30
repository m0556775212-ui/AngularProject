import { Component } from '@angular/core';
import { CommentsService } from '../../../services/commentsService/comments-service';
import { inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-comments',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './comments.html',
  styleUrl: './comments.css',
})
export class Comments {
  private commentsService = inject(CommentsService);
  taskId = String(inject(ActivatedRoute).snapshot.paramMap.get('id'));
  comments$ = this.commentsService.getComments(this.taskId);
}
