import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Teams } from './components/team/teams/teams';
import { authGuard } from './guards/auth.guard';
import { Register } from './components/auth/register/register';
import { Header } from './components/header/header';
import { AddTeam } from './components/team/add-team/add-team';
import { AddMemberToTeam } from './components/team/add-member-to-team/add-member-to-team';
import { projects } from './components/project/projects/projects';
import { Addproject } from './components/project/add-project/add-project';
import { tasks } from './components/tasks/tasks/tasks';
import { Addtask } from './components/tasks/add-task/add-task';
import { UpdateTask } from './components/tasks/update-task/update-task';
import { DeleteTask } from './components/tasks/delete-task/delete-task';
import { AddComment } from './components/comment/add-comment/add-comment';
import { Comments } from './components/comment/comments/comments';
import { HomeComponent } from './components/home/home';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'header', component: Header },
    { path: 'teams', component: Teams, canActivate: [authGuard] },
    { path: 'add-team', component: AddTeam, canActivate: [authGuard] },
    { path: 'addMemberToTeam/:teamId', component: AddMemberToTeam, canActivate: [authGuard] },
    { path: 'projects', component: projects, canActivate: [authGuard] },
    { path: 'add-project', component: Addproject, canActivate: [authGuard] },
    { path: 'tasks', component: tasks, canActivate: [authGuard] },
    { path: 'add-task', component: Addtask, canActivate: [authGuard] },
    { path: 'update-task/:id', component: UpdateTask, canActivate: [authGuard] },
    { path: 'delete-task/:id', component: DeleteTask, canActivate: [authGuard] },
    { path: 'comments/:id', component: Comments, canActivate: [authGuard] },
    { path: 'add-comment/:id', component: AddComment, canActivate: [authGuard] }
];
