import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { UserRegister, UserDetails, UserLogin, User } from '../../models/auth.models';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  login(user: UserLogin){
     return this.http.post<UserDetails>('https://angularprojectserver-yr0s.onrender.com/api/auth/login', user)
    .pipe(
      tap(response => {
        if (response && response.token) {
          this.saveToSession(response.token, response.user);
          this.router.navigate(['/teams']);
        }
      })
    );
  }

  register(user: UserRegister): Observable<UserDetails> {
    return this.http.post<UserDetails>('https://angularprojectserver-yr0s.onrender.com/api/auth/register', user)
    .pipe(
      tap(response => {
         if (response && response.token) {
          this.saveToSession(response.token, response.user);
          this.router.navigate(['/teams']);
         }
      })
    );
  } 

  saveToSession(token: string, userDetails: User) {
    sessionStorage.setItem('authToken', token);
    sessionStorage.setItem('userDetails', JSON.stringify(userDetails));
  }

  logout() {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userDetails');
    this.router.navigate(['/login']);
  }

  get currentUser(): User | null {
    const userStr = sessionStorage.getItem('userDetails');
    return userStr ? JSON.parse(userStr) : null;
  }
}
