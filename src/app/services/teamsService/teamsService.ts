import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Team } from '../../models/teams.models';

@Injectable({
  providedIn: 'root',
})

export class TeamsService {

  private http = inject(HttpClient);
  
  getTeams() : Observable<Team[]> {
    return this.http.get<Team[]>('https://angularprojectserver-yr0s.onrender.com/api/teams');
  }

  AddTeam(name: string) {
    return this.http.post('https://angularprojectserver-yr0s.onrender.com/api/teams', { name });
  }

  AddMemberToTeam(teamId: string, userId: string){
    return this.http.post(`https://angularprojectserver-yr0s.onrender.com/api/teams/${teamId}/members`, { userId });
  }

}
