import { Component, inject, signal } from '@angular/core';
import { Team } from '../../../models/teams.models';
import { TeamsService } from '../../../services/teamsService/teamsService';
import { LoginService } from '../../../services/loginService/loginService';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-teams',
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule, MatListModule, MatIconModule, MatDividerModule],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
  standalone: true,
})
export class Teams {
  private teamsService = inject(TeamsService);
  private loginService = inject(LoginService);

  teams = signal<Team[]>([]);
  userId = this.loginService.currentUser?.id;

  constructor() {
    this.teamsService.getTeams()
      .pipe(takeUntilDestroyed())
      .subscribe((data: Team[]) => {
        console.log('Teams data received:', data);
        this.teams.set(data);
      });
  }

  isOwner(team: Team): boolean {
    // If ownerId is missing or logic differs, assume false or check string equality. 
    // Assuming team.ownerId matches user.id format.
    return String(team.ownerId) === String(this.userId);
  }
}
