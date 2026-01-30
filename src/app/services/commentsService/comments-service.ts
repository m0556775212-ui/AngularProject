import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { addComment, comment } from '../../models/comment.models';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {

  private http = inject(HttpClient);
  
  getComments(taskId: string) {
    return toSignal(
      this.http.get<comment[]>(`https://angularprojectserver-yr0s.onrender.com/api/comments?taskId=${taskId}`)
    );
  }

  addComment(commentData: addComment) {
    return this.http.post('https://angularprojectserver-yr0s.onrender.com/api/comments', commentData);
  }
}
