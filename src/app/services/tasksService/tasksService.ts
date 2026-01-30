import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { task, AddTask } from '../../models/task.models';
@Injectable({
  providedIn: 'root',
})

export class tasksService {

  private http = inject(HttpClient);
  
  gettasks(projectId?: string) : Observable<task[]> {
    let url = 'https://angularprojectserver-yr0s.onrender.com/api/tasks';
    if (projectId) {
      url += `?projectId=${projectId}`;
    }
    return this.http.get<task[]>(url);
  }

  Addtask(taskData: AddTask) {
    return this.http.post('https://angularprojectserver-yr0s.onrender.com/api/tasks', taskData);
  }

  AddMemberTotask(taskId: string, userId: string){
    return this.http.post(`https://angularprojectserver-yr0s.onrender.com/api/tasks/${taskId}/members`, { userId });
  }

  updateTask(taskId: string, updates: task) {
    return this.http.patch(`https://angularprojectserver-yr0s.onrender.com/api/tasks/${taskId}`, updates);
  }

  deleteTask(taskId: string) {
    return this.http.delete(`https://angularprojectserver-yr0s.onrender.com/api/tasks/${taskId}`);
  }

}
