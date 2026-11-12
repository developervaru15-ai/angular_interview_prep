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
  templateUrl: './user-list-example.component.html',
  styleUrls: ['./user-list-example.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserListExampleComponent implements OnInit, OnDestroy {
  // Observables
  users$: Observable<User[]>;
  currentUser$: Observable<User | null>;
  loading$: Observable<boolean>;
  loadError$: Observable<string | null>;

  // Destroy subject for cleanup
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {
    this.users$ = this.userService.userList$;
    this.currentUser$ = this.userService.currentUser$;
    this.loading$ = this.userService.loading$;
    this.loadError$ = this.userService.loadError$;
  }

  ngOnInit(): void {
    console.log('UserListExampleComponent initialized');

    // Example: Subscribe to service state with the unsubscribe pattern
    this.userService.userList$
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: User[]) => console.log('Users loaded:', users));
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

  refreshUsers(): void {
    this.userService.refreshUsers();
  }
}
