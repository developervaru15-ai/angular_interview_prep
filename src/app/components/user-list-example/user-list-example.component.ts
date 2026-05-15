import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService, User } from '../../services/user.service.example';

/**
 * Example component demonstrating:
 * - Component lifecycle
 * - OnPush change detection
 * - Proper unsubscribe pattern
 * - AsyncPipe usage
 * - TrackBy function
 */

@Component({
  selector: 'app-user-list-example',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container">
      <h1>Angular Interview Prep - User List</h1>

      <!-- Loading state -->
      <div *ngIf="(users$ | async) as users; else loading">
        <!-- User List with TrackBy -->
        <div class="user-list">
          <div 
            *ngFor="let user of users; trackBy: trackById"
            class="user-card"
          >
            <h3>{{ user.name }}</h3>
            <p>Email: {{ user.email }}</p>
            <p>Role: 
              <span [ngClass]="user.role === 'admin' ? 'admin-badge' : 'user-badge'">
                {{ user.role }}
              </span>
            </p>
            <button (click)="onSelectUser(user)">View Details</button>
          </div>
        </div>

        <!-- Current user details -->
        <div *ngIf="currentUser$ | async as user" class="current-user">
          <h2>Current User Details</h2>
          <p><strong>ID:</strong> {{ user.id }}</p>
          <p><strong>Name:</strong> {{ user.name }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> {{ user.role }}</p>
        </div>
      </div>

      <!-- Loading template -->
      <ng-template #loading>
        <p>Loading users...</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }

    h1 {
      color: #1976d2;
      margin-bottom: 30px;
    }

    .user-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .user-card {
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s;
    }

    .user-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    .user-card h3 {
      margin-top: 0;
      color: #1976d2;
    }

    .admin-badge {
      background-color: #ff5722;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    .user-badge {
      background-color: #4caf50;
      color: white;
      padding: 2px 8px;
      border-radius: 4px;
      font-size: 12px;
    }

    button {
      background-color: #1976d2;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }

    button:hover {
      background-color: #1565c0;
    }

    .current-user {
      background-color: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      margin-top: 30px;
      border-left: 4px solid #1976d2;
    }

    .current-user h2 {
      margin-top: 0;
      color: #1976d2;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListExampleComponent implements OnInit, OnDestroy {
  // Observables
  users$: Observable<User[]>;
  currentUser$: Observable<User | null>;

  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {
    this.users$ = this.userService.userList$;
    this.currentUser$ = this.userService.currentUser$;
  }

  ngOnInit(): void {
    console.log('UserListExampleComponent initialized');
    
    // Example: Subscribe with unsubscribe pattern
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (users: User[]) => console.log('Users loaded:', users),
        (error: any) => console.error('Error loading users:', error)
      );
  }

  ngOnDestroy(): void {
    console.log('UserListExampleComponent destroyed');
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * TrackBy function for *ngFor optimization
   * Prevents Angular from re-rendering entire list on change detection
   */
  trackById(index: number, user: User): number {
    return user.id;
  }

  /**
   * Handle user selection
   */
  onSelectUser(user: User): void {
    console.log('Selected user:', user);
    this.userService.setCurrentUser(user);
  }
}
