import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'

@Injectable()
export class AuthService {
  storageKey = 'MelonSubSyncerJwt';

  constructor(private router: Router, private apiService: ApiService) {}

  deleteToken() {
    localStorage.removeItem(this.storageKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken(): string {
    return localStorage.getItem(this.storageKey);
  }

  isTokenSet(): boolean {
    return this.getToken() !== null;
  }

  login(username: string, password:string):Observable<any> {
    return this.apiService.post('auth/authenticate', {
      username: username, password: password
    })
    .pipe( tap(data => this.setToken(data.token)));
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
