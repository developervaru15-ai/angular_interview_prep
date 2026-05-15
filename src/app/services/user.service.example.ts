import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Example Service for interview prep
 * Demonstrates:
 * - Dependency Injection
 * - Observable patterns
 * - BehaviorSubject for state management
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://api.example.com/api/users';
  
  // BehaviorSubject for state management
  private userListSubject = new BehaviorSubject<User[]>([]);
  public userList$ = this.userListSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}`)
      .pipe(
        map(response => response.data)
      );
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`)
      .pipe(
        map(response => response.data)
      );
  }

  /**
   * Create a new user
   */
  createUser(user: Omit<User, 'id'>): Observable<User> {
    return this.http.post<ApiResponse<User>>(this.apiUrl, user)
      .pipe(
        map(response => response.data)
      );
  }

  /**
   * Update user
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/${id}`, user)
      .pipe(
        map(response => response.data)
      );
  }

  /**
   * Delete user
   */
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Load users into BehaviorSubject
   */
  private loadUsers(): void {
    this.getUsers().subscribe(
      users => this.userListSubject.next(users),
      error => console.error('Error loading users:', error)
    );
  }

  /**
   * Set current user
   */
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
  }

  /**
   * Get current user value
   */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Search users by name
   */
  searchUsers(searchTerm: string): Observable<User[]> {
    return this.userList$.pipe(
      map(users => users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }
}
