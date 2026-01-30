import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { project, addProject } from '../../models/project.models';

@Injectable({
  providedIn: 'root',
})

export class projectsService {

  private http = inject(HttpClient);
  
  getprojects() : Observable<project[]> {
    return this.http.get<project[]>('https://angularprojectserver-yr0s.onrender.com/api/projects');
  }

  Addproject(projectData: addProject) {
    return this.http.post('https://angularprojectserver-yr0s.onrender.com/api/projects', projectData);
  }

  AddMemberToproject(projectId: string, userId: string){
    return this.http.post(`https://angularprojectserver-yr0s.onrender.com/api/projects/${projectId}/members`, { userId });
  }

}
