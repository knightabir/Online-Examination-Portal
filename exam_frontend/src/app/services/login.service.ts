import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import baseUrl from './helper';

interface User {
  // Other user properties
  authorities: any[]; // Example assuming an array of authorities
}


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${baseUrl}/current-user`).pipe(
      catchError((error) => {
        // Handle errors gracefully
        return this.handleError(error);
      })
    );
  }

  generateToken(loginData: any): Observable<any> {
    return this.http.post(`${baseUrl}/generate-token`, loginData).pipe(
      catchError((error) => {
        return this.handleError(error);
      })
    );
  }

  loginUser(token: any): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('token', token);
      return true;
    } else {
      // Handle non-browser environment logic here
      return false;
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const tokenStr = localStorage.getItem('token');
      return !!tokenStr;
    } else {
      return false; // Or provide alternative logic
    }
  }

  logout(): boolean {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    } else {
      // Handle non-browser environment logic here
      return false;
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: User): void {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUser(): User | null {
    if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          return JSON.parse(userStr);
        } catch (error) {
          console.error('Error parsing user from localStorage:', error);
          return null;
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  getUserRole(): string | null {
    const user = this.getUser();
    return user?.authorities?.[0]?.authority; // Optional chaining
  }
  

  private handleError(error: any): Observable<never> {
    // Handle errors appropriately, e.g., log errors, display error messages
    console.error('An error occurred:', error);
    // Return an observable with a user-facing error message
    return throwError(() => new Error('Something went wrong'));
  }
}
