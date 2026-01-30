import { Component } from '@angular/core';
import { CommentsService } from '../../../services/commentsService/comments-service';
import { inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { addComment } from '../../../models/comment.models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule, CommonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-comment.html',
  styleUrl: './add-comment.css',
})
export class AddComment {
  private addCommentService = inject(CommentsService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  taskId = String(inject(ActivatedRoute).snapshot.paramMap.get('id'));

  commentForm = this.fb.group({
    body: ['', Validators.required]
  });

  addComment() {
    const userDetails = sessionStorage.getItem('userDetails');
    const userId = userDetails ? JSON.parse(userDetails).id : 0;

    const newComment: addComment = {
      taskId: this.taskId,
      body: this.commentForm.value.body || '',
      userId: userId
    };

    if (this.commentForm.valid) {
      this.addCommentService.addComment(newComment).subscribe(
        () => {
          this.router.navigate([`/comments/${this.taskId}`]);
        }
      );
    }
  }
}
