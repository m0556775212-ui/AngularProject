import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../models/user.models';

@Injectable({
  providedIn: 'root',
})
export class Users {
  private http = inject(HttpClient);
  private apiUrl = 'https://angularprojectserver-yr0s.onrender.com/api/users';

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
