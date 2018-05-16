import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class AuthService {
  storageKey = 'MelonSubSyncerJwt';

  constructor(private router: Router) {
  }

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

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/placeholder']);
  }
}
