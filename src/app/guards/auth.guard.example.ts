import { Injectable } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

/**
 * Example Authentication Guard
 * Demonstrates:
 * - Route guards
 * - CanActivateFn
 * - Authorization logic
 */

export interface AuthUser {
  id: number;
  name: string;
  role: 'admin' | 'user';
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser: AuthUser | null = null;

  constructor(private router: Router) {
    // Initialize from localStorage in real app
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }

  /**
   * Check if user is logged in
   */
  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  /**
   * Get current user
   */
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  /**
   * Check if user has role
   */
  hasRole(role: 'admin' | 'user'): boolean {
    return this.currentUser?.role === role;
  }

  /**
   * Login user
   */
  login(credentials: { username: string; password: string }): Observable<AuthUser> {
    // Simulate API call
    const mockUser: AuthUser = {
      id: 1,
      name: 'John Doe',
      role: 'user',
      token: 'mock-jwt-token'
    };
    
    this.currentUser = mockUser;
    localStorage.setItem('currentUser', JSON.stringify(mockUser));
    return of(mockUser);
  }

  /**
   * Logout user
   */
  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}

/**
 * Guard: Check if user is authenticated
 */
export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = new AuthService(new Router());
  
  if (authService.isLoggedIn()) {
    return true;
  } else {
    // Redirect to login
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
};

/**
 * Guard: Check if user has admin role
 */
export const adminGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = new AuthService(new Router());
  
  if (authService.isLoggedIn() && authService.hasRole('admin')) {
    return true;
  } else {
    console.warn('Access denied: Admin role required');
    return false;
  }
};

/**
 * Guard: Prevent navigation if there are unsaved changes
 */
export const canDeactivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  // In a real component, you would check component.hasUnsavedChanges()
  const hasUnsavedChanges = false; // Replace with actual check
  
  if (hasUnsavedChanges) {
    return confirm('You have unsaved changes. Do you want to leave?');
  }
  return true;
};
