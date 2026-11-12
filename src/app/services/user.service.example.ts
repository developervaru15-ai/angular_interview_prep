import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
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
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  username: string;
  image: string;
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

// Generic envelope example; DummyJSON's user-list endpoint uses UsersResponse.
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://dummyjson.com/users';
  
  // BehaviorSubject for state management
  private userListSubject = new BehaviorSubject<User[]>([]);
  public userList$ = this.userListSubject.asObservable();

  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();

  private loadErrorSubject = new BehaviorSubject<string | null>(null);
  public loadError$ = this.loadErrorSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  /**
   * Get all users
   */
  getUsers(): Observable<User[]> {
    return this.http.get<UsersResponse>(this.apiUrl)
      .pipe(
        map(response => response.users)
      );
  }

  /**
   * Get user by ID
   */
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  /**
   * Create a new user
   */
  createUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/add`, user);
  }

  /**
   * Update user
   */
  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
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
    this.loadingSubject.next(true);
    this.loadErrorSubject.next(null);

    this.getUsers()
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: users => this.userListSubject.next(users),
        error: error => {
          console.error('Error loading users from DummyJSON:', error);
          this.loadErrorSubject.next('Unable to load users. Check your connection and try again.');
        },
      });
  }

  /**
   * Reload users from the API
   */
  refreshUsers(): void {
    this.loadUsers();
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
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
      ))
    );
  }
}
