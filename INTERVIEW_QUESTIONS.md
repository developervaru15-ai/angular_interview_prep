# Angular Interview Questions & Answers

## Table of Contents
1. [Fundamentals](#fundamentals)
2. [Components](#components)
3. [Services & Dependency Injection](#services--dependency-injection)
4. [RxJS & Observables](#rxjs--observables)
5. [Routing](#routing)
6. [Forms](#forms)
7. [Change Detection & Performance](#change-detection--performance)
8. [Directives & Pipes](#directives--pipes)
9. [Testing](#testing)
10. [Security & Best Practices](#security--best-practices)

---

## Fundamentals

### Q1: What is Angular? What are its key features?

**Answer:**
Angular is a TypeScript-based, open-source framework developed by Google for building dynamic web applications. 

**Key Features:**
- Dependency Injection (DI)
- Component-based architecture
- RxJS integration for reactive programming
- Built-in routing and form handling
- Strong typing with TypeScript
- Change Detection mechanism
- CLI for scaffolding and building

**Example:**
```typescript
// Simple Angular component
import { Component } from '@angular/core';

@Component({
  selector: 'app-hello',
  template: '<h1>{{ message }}</h1>',
  styles: ['h1 { color: blue; }']
})
export class HelloComponent {
  message = 'Hello, Angular!';
}
```

---

### Q2: What is the difference between Angular and AngularJS?

**Answer:**

| Feature | AngularJS | Angular |
|---------|-----------|---------|
| **Language** | JavaScript | TypeScript |
| **Architecture** | MVC | Component-based |
| **Dependency Injection** | Built-in | Built-in |
| **Mobile Support** | Limited | Full support |
| **CLI** | None | Angular CLI |
| **Performance** | Slower | Faster (improved change detection) |
| **Version** | 1.x | 2.x and above |

---

### Q3: Explain Angular Modules (NgModule). What is a Standalone Component?

**Answer:**

**NgModule:** Groups related components, directives, pipes, and services.

```typescript
// app.module.ts (Traditional approach)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**Standalone Components (Angular 14+):** Simplified approach without NgModule.

```typescript
// app.component.ts (Standalone approach)
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'Angular App';
}
```

---

## Components

### Q4: What is a Component? Explain the Component Lifecycle.

**Answer:**

**Component** is the basic building block of Angular. It controls a section of the UI.

**Lifecycle Hooks:**

```typescript
import { 
  Component, 
  OnInit, 
  OnChanges, 
  OnDestroy,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-lifecycle',
  template: `<div>{{ name }}</div>`
})
export class LifecycleComponent implements 
  OnInit, 
  OnChanges, 
  DoCheck, 
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy {
  
  name = 'John';

  constructor() {
    console.log('1. Constructor called');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('2. ngOnChanges called', changes);
  }

  ngOnInit() {
    console.log('3. ngOnInit called - component initialized');
  }

  ngDoCheck() {
    console.log('4. ngDoCheck called');
  }

  ngAfterContentInit() {
    console.log('5. ngAfterContentInit called');
  }

  ngAfterContentChecked() {
    console.log('6. ngAfterContentChecked called');
  }

  ngAfterViewInit() {
    console.log('7. ngAfterViewInit called - view initialized');
  }

  ngAfterViewChecked() {
    console.log('8. ngAfterViewChecked called');
  }

  ngOnDestroy() {
    console.log('9. ngOnDestroy called - component destroyed');
  }
}
```

**Execution Order:**
1. Constructor
2. ngOnChanges
3. ngOnInit
4. ngDoCheck
5. ngAfterContentInit
6. ngAfterContentChecked
7. ngAfterViewInit
8. ngAfterViewChecked
9. ngOnDestroy

---

### Q5: How do you pass data to a child component? (Input/Output)

**Answer:**

**Using @Input() - Parent to Child**

```typescript
// child.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>Message from parent: {{ message }}</p>'
})
export class ChildComponent {
  @Input() message: string = '';
}

// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `<app-child [message]="parentMessage"></app-child>`
})
export class ParentComponent {
  parentMessage = 'Hello from Parent!';
}
```

**Using @Output() - Child to Parent**

```typescript
// child.component.ts
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<button (click)="sendMessage()">Send Message</button>'
})
export class ChildComponent {
  @Output() messageEvent = new EventEmitter<string>();

  sendMessage() {
    this.messageEvent.emit('Hello from Child!');
  }
}

// parent.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: '<app-child (messageEvent)="receiveMessage($event)"></app-child>'
})
export class ParentComponent {
  receiveMessage(message: string) {
    console.log(message); // 'Hello from Child!'
  }
}
```

---

### Q6: What is ViewChild and ViewChildren?

**Answer:**

**@ViewChild:** Accesses a single child component/element.

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-parent',
  template: `<app-child #childRef></app-child>`
})
export class ParentComponent implements AfterViewInit {
  @ViewChild('childRef') childComponent!: ChildComponent;
  @ViewChild('childRef', { read: ElementRef }) childElement!: ElementRef;

  ngAfterViewInit() {
    console.log(this.childComponent);
    this.childComponent.someMethod();
  }
}
```

**@ViewChildren:** Accesses multiple child components/elements.

```typescript
import { Component, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child *ngFor="let item of items"></app-child>
  `
})
export class ParentComponent {
  @ViewChildren(ChildComponent) children!: QueryList<ChildComponent>;

  items = [1, 2, 3];

  callChildMethods() {
    this.children.forEach(child => child.someMethod());
  }
}
```

---

## Services & Dependency Injection

### Q7: What is a Service? How do you create and use services?

**Answer:**

**Service** is a class that contains business logic and can be shared across components.

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available application-wide
})
export class UserService {
  private apiUrl = 'https://api.example.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

// component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <div>
      <div *ngFor="let user of users">
        {{ user.name }}
      </div>
    </div>
  `
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(
      data => this.users = data,
      error => console.error(error)
    );
  }
}
```

---

### Q8: Explain Dependency Injection in Angular.

**Answer:**

**Dependency Injection** is a design pattern for managing dependencies between classes.

```typescript
// Without DI (Tight Coupling)
class ChildComponent {
  private userService = new UserService(); // Hard dependency
}

// With DI (Loose Coupling)
@Component({...})
class ChildComponent {
  constructor(private userService: UserService) {} // Injected
}
```

**Providing Services:**

```typescript
// 1. Root level (Singleton)
@Injectable({ providedIn: 'root' })
export class UserService {}

// 2. Module level
@NgModule({
  providers: [UserService]
})
export class AppModule {}

// 3. Component level (New instance for each component)
@Component({
  providers: [UserService]
})
export class MyComponent {}

// 4. Using a Factory
export function userServiceFactory() {
  return new UserService();
}

@Injectable()
export class MyService {
  constructor(
    @Inject(UserService) userService: UserService
  ) {}
}
```

---

## RxJS & Observables

### Q9: What are Observables? How do they differ from Promises?

**Answer:**

**Observable:** A sequence of values over time, lazy, cancelable, and supports multiple subscribers.

```typescript
// Observable Example
import { Observable } from 'rxjs';

const observable$ = new Observable(subscriber => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.complete();
});

// Subscribe to observable
observable$.subscribe({
  next: (value) => console.log(value),
  error: (error) => console.error(error),
  complete: () => console.log('Done')
});
// Output: 1, 2, 3, Done
```

**Observable vs Promise:**

| Feature | Observable | Promise |
|---------|-----------|---------|
| **Multiple Values** | Yes | No (single value) |
| **Lazy** | Yes (not executed until subscribed) | No (executed immediately) |
| **Cancelable** | Yes (unsubscribe) | No |
| **Operators** | Rich set (map, filter, etc.) | Limited |
| **Error Handling** | Built-in | .catch() |

```typescript
// Promise - Single Value
const promise = new Promise((resolve, reject) => {
  resolve(42);
});

promise.then(value => console.log(value)); // 42
// Not cancelable

// Observable - Multiple Values
const observable$ = interval(1000).pipe(
  take(5)
);

const subscription = observable$.subscribe(
  value => console.log(value)
);

subscription.unsubscribe(); // Cancelable!
```

---

### Q10: What are common RxJS Operators? Explain map, filter, switchMap, and mergeMap.

**Answer:**

```typescript
import { from, of, Observable } from 'rxjs';
import { map, filter, switchMap, mergeMap, tap } from 'rxjs/operators';

// 1. map - Transform data
const numbers$ = of(1, 2, 3, 4);
numbers$.pipe(
  map(num => num * 2)
).subscribe(console.log); // 2, 4, 6, 8

// 2. filter - Filter values
numbers$.pipe(
  filter(num => num > 2)
).subscribe(console.log); // 3, 4

// 3. switchMap - Switch to new observable (cancels previous)
// Best for search requests
const searchTerm$ = of('angular');
searchTerm$.pipe(
  switchMap(term => this.userService.search(term))
).subscribe(results => console.log(results));

// 4. mergeMap - Merge all observables (doesn't cancel previous)
// Best for parallel requests
const ids$ = of(1, 2, 3);
ids$.pipe(
  mergeMap(id => this.userService.getUserById(id))
).subscribe(user => console.log(user));

// 5. Other useful operators
const data$ = of({ name: 'John', age: 30 });

data$.pipe(
  tap(data => console.log('Data:', data)), // Side effects
  map(data => data.name),
  filter(name => name.length > 0)
).subscribe(console.log);
```

---

### Q11: What is the difference between Subject and BehaviorSubject?

**Answer:**

```typescript
import { Subject, BehaviorSubject } from 'rxjs';

// Subject - No initial value, subscribers only get values emitted after subscription
const subject = new Subject<string>();

subject.subscribe(value => console.log('Subscriber 1:', value));
subject.next('Hello'); // Output: Subscriber 1: Hello

subject.subscribe(value => console.log('Subscriber 2:', value));
subject.next('World'); // Output: Subscriber 1: World, Subscriber 2: World

// BehaviorSubject - Has initial value, new subscribers get last emitted value
const behaviorSubject = new BehaviorSubject<string>('Initial');

behaviorSubject.subscribe(value => console.log('Sub 1:', value)); // Initial

behaviorSubject.next('New Value');
behaviorSubject.subscribe(value => console.log('Sub 2:', value)); // New Value (gets last value)
```

**Use Cases:**
- **Subject:** Event buses, multiple subscribers
- **BehaviorSubject:** State management, current state sharing

```typescript
// Shared state service using BehaviorSubject
@Injectable({ providedIn: 'root' })
export class StateService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.value;
  }
}
```

---

## Routing

### Q12: Explain Angular Router and routing configuration.

**Answer:**

```typescript
// app.routes.ts (Standalone routing)
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent } // Wildcard route
];

// app.config.ts (Standalone)
import { provideRouter } from '@angular/router';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES)
  ]
};
```

**Route Navigation:**

```typescript
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  template: `
    <a routerLink="/about">About</a>
    <a [routerLink]="['/user', userId]">User Details</a>
    <button (click)="navigateProgrammatically()">Go to Admin</button>
  `
})
export class NavigationComponent {
  userId = 123;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  navigateProgrammatically() {
    this.router.navigate(['/admin']);
  }

  getRouteParams() {
    this.route.params.subscribe(params => {
      console.log('User ID:', params['id']);
    });
  }

  getQueryParams() {
    this.route.queryParams.subscribe(params => {
      console.log('Search:', params['search']);
    });
  }
}
```

---

### Q13: What are Route Guards? Explain canActivate, canDeactivate, and resolve.

**Answer:**

**Route Guards** control navigation to and from routes.

```typescript
// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

// canDeactivate.guard.ts
export const canDeactivateGuard: CanDeactivateFn<any> = (component) => {
  if (component.hasUnsavedChanges()) {
    return confirm('You have unsaved changes. Do you want to leave?');
  }
  return true;
};

// user-resolver.ts
export const userResolver: ResolveFn<User> = (route: ActivatedRouteSnapshot) => {
  const userService = inject(UserService);
  const userId = route.paramMap.get('id')!;
  
  return userService.getUserById(userId);
};

// app.routes.ts
export const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [authGuard]
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    canDeactivate: [canDeactivateGuard]
  },
  {
    path: 'user/:id',
    component: UserDetailComponent,
    resolve: { user: userResolver }
  }
];
```

---

## Forms

### Q14: What are Template-driven Forms vs Reactive Forms?

**Answer:**

**Template-driven Forms:**
```typescript
// user.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="onSubmit(form)" #form="ngForm">
      <input 
        ngModel 
        name="name" 
        required 
        [(ngModel)]="user.name"
      />
      <input 
        ngModel 
        name="email" 
        email 
        [(ngModel)]="user.email"
      />
      <button type="submit" [disabled]="!form.valid">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  user = { name: '', email: '' };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log(this.user);
    }
  }
}
```

**Reactive Forms:**
```typescript
// user-reactive.component.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-reactive-form',
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input 
        formControlName="name" 
        placeholder="Name"
      />
      <div *ngIf="userForm.get('name')?.invalid && userForm.get('name')?.touched">
        Name is required
      </div>

      <input 
        formControlName="email" 
        placeholder="Email"
      />
      <div *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched">
        Invalid email
      </div>

      <button type="submit" [disabled]="userForm.invalid">Submit</button>
    </form>
  `
})
export class UserReactiveFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    }
  }
}
```

**Comparison:**

| Feature | Template-driven | Reactive |
|---------|-----------------|----------|
| **Setup** | Simple | More code |
| **Testing** | Harder | Easier |
| **Scalability** | Limited | Better for large forms |
| **Validation** | HTML Validators | Custom validators |
| **Control** | Less control | More control |

---

## Change Detection & Performance

### Q15: Explain Change Detection in Angular. What is OnPush strategy?

**Answer:**

**Change Detection:** Angular checks if component state has changed and updates the view.

**Default Strategy (Every check):**
```typescript
@Component({
  selector: 'app-default',
  template: `<p>{{ data }}</p>`
})
export class DefaultComponent {
  data = 'Initial';

  // Change detection runs on every event
  updateData() {
    this.data = 'Updated';
  }
}
```

**OnPush Strategy (Only when inputs change):**
```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-optimized',
  template: `<p>{{ user.name }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
  @Input() user!: { name: string };

  // Change detection only runs when:
  // 1. @Input properties change
  // 2. Events in this component
  // 3. Async pipe updates
}

// Parent component
@Component({
  template: `<app-optimized [user]="user"></app-optimized>`
})
export class ParentComponent {
  user = { name: 'John' };

  updateUser() {
    this.user = { name: 'Jane' }; // Triggers change detection
    // this.user.name = 'Jane'; // Won't trigger with OnPush!
  }
}
```

**Benefits of OnPush:**
- Better performance (fewer checks)
- More predictable
- Encourages immutability

---

### Q16: How do you optimize Angular applications?

**Answer:**

```typescript
// 1. Use OnPush Change Detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// 2. TrackBy in *ngFor
@Component({
  template: `
    <div *ngFor="let item of items; trackBy: trackById">
      {{ item.name }}
    </div>
  `
})
export class ListComponent {
  items: Item[] = [];

  trackById(index: number, item: Item) {
    return item.id; // Track by unique identifier
  }
}

// 3. Lazy Loading Routes
export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component')
      .then(m => m.AdminComponent),
    canActivate: [authGuard]
  }
];

// 4. Unsubscribe from Observables
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({...})
export class UserComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// 5. Use async pipe
@Component({
  template: `
    <div>{{ user$ | async as user }}
      {{ user.name }}
    </div>
  `
})
export class UserProfileComponent {
  user$ = this.userService.getUser();

  constructor(private userService: UserService) {}
}
```

---

## Directives & Pipes

### Q17: Create a custom directive. Explain structural vs attribute directives.

**Answer:**

**Attribute Directive:**
```typescript
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  @Input() highlightColor = 'yellow';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter')
  onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.highlight('transparent');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}

// Usage
@Component({
  template: `<p appHighlight [highlightColor]="'green'">Hover me!</p>`,
  imports: [HighlightDirective]
})
export class DemoComponent {}
```

**Structural Directive:**
```typescript
import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appIf]',
  standalone: true
})
export class IfDirective {
  @Input()
  set appIf(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}
}

// Usage
@Component({
  template: `<p *appIf="showMessage">Message is visible</p>`,
  imports: [IfDirective]
})
export class DemoComponent {
  showMessage = true;
}
```

---

### Q18: Create a custom pipe. What are common built-in pipes?

**Answer:**

**Custom Pipe:**
```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
  standalone: true
})
export class ReversePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    return value.split('').reverse().join('');
  }
}

// Usage
@Component({
  template: `<p>{{ 'Hello' | reverse }}</p>`, // Output: olleH
  imports: [ReversePipe]
})
export class DemoComponent {}
```

**Common Built-in Pipes:**
```typescript
@Component({
  template: `
    <!-- String pipes -->
    {{ 'hello' | uppercase }} <!-- HELLO -->
    {{ 'HELLO' | lowercase }} <!-- hello -->
    {{ text | slice:0:5 }} <!-- First 5 characters -->
    
    <!-- Number pipes -->
    {{ 1000 | number:'1.2-2' }} <!-- 1,000.00 -->
    {{ 0.5 | percent }} <!-- 50% -->
    {{ 1000 | currency:'USD' }} <!-- $1,000.00 -->
    
    <!-- Date pipes -->
    {{ date | date:'short' }} <!-- 5/16/26, 10:30 AM -->
    {{ date | date:'medium' }} <!-- May 16, 2026, 10:30:00 AM -->
    
    <!-- Array pipes -->
    {{ [1,2,3,4,5] | slice:0:3 | json }} <!-- [1,2,3] -->
    
    <!-- Async pipe -->
    {{ users$ | async | json }} <!-- Subscribes automatically -->
  `
})
export class DemoComponent {
  text = 'Angular';
  date = new Date();
  users$: Observable<User[]> = this.userService.getUsers();

  constructor(private userService: UserService) {}
}
```

---

## Testing

### Q19: How do you test Angular components? Provide examples.

**Answer:**

```typescript
// user.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <button (click)="onDelete()">Delete</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user = { id: 1, name: 'John' };
  @Output() deleteEvent = new EventEmitter<number>();

  onDelete() {
    this.deleteEvent.emit(this.user.id);
  }
}

// user.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCardComponent } from './user.component';

describe('UserCardComponent', () => {
  let component: UserCardComponent;
  let fixture: ComponentFixture<UserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user name', () => {
    component.user = { id: 1, name: 'Alice' };
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('h2');
    expect(element.textContent).toContain('Alice');
  });

  it('should emit deleteEvent when delete button clicked', () => {
    spyOn(component.deleteEvent, 'emit');
    component.user = { id: 5, name: 'Bob' };
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(component.deleteEvent.emit).toHaveBeenCalledWith(5);
  });

  it('should use DebugElement', () => {
    component.user = { id: 1, name: 'Charlie' };
    fixture.detectChanges();

    const debugElement = fixture.debugElement;
    const h2 = debugElement.query(By.css('h2'));
    expect(h2.nativeElement.textContent).toContain('Charlie');
  });
});
```

---

### Q20: How do you test services?

**Answer:**

```typescript
// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('/api/users');
  }

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`/api/users/${id}`);
  }
}

// user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no pending requests
  });

  it('should fetch users', () => {
    const mockUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch user by id', () => {
    const mockUser = { id: 1, name: 'John' };

    service.getUserById(1).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/users/1');
    req.flush(mockUser);
  });

  it('should handle errors', () => {
    service.getUsers().subscribe(
      () => fail('should have failed'),
      (error) => expect(error.status).toBe(404)
    );

    const req = httpMock.expectOne('/api/users');
    req.flush('Not found', { status: 404, statusText: 'Not Found' });
  });
});
```

---

## Security & Best Practices

### Q21: What are security best practices in Angular?

**Answer:**

```typescript
// 1. Sanitize user input
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  template: `<div [innerHTML]="sanitizedHtml"></div>`
})
export class SecurityComponent {
  userInput = '<img src="x" onerror="alert(1)">';
  sanitizedHtml: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    this.sanitizedHtml = this.sanitizer.sanitize(
      SecurityContext.HTML, 
      this.userInput
    )!;
  }
}

// 2. Use HTTP Interceptor for authentication
import { Injectable } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};

// 3. Avoid using any
// Bad
function processData(data: any) {
  return data.value;
}

// Good
interface Data {
  value: string;
  count: number;
}

function processData(data: Data) {
  return data.value;
}

// 4. Use Content Security Policy headers
// In your server/web.config or angular.json

// 5. Keep dependencies updated
// Run: npm audit and npm update

// 6. Never store sensitive data in localStorage
// Use httpOnly cookies instead
```

---

### Q22: What are Angular best practices?

**Answer:**

```typescript
// 1. Use standalone components
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-example',
  template: `...`
})
export class ExampleComponent {}

// 2. Proper folder structure
/*
src/
├── app/
│   ├── components/
│   ├── services/
│   ├── guards/
│   ├── interceptors/
│   ├── models/
│   ├── pipes/
│   ├── directives/
│   ├── app.routes.ts
│   └── app.config.ts
├── assets/
└── styles/
*/

// 3. Use environment variables
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};

// service.ts
import { environment } from '../environments/environment';

@Injectable()
export class UserService {
  private apiUrl = environment.apiUrl;
}

// 4. Use OnPush change detection
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})

// 5. Unsubscribe properly
private destroy$ = new Subject<void>();

ngOnInit() {
  this.userService.getUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe(users => this.users = users);
}

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// 6. Use meaningful naming conventions
// Good
getActiveUsers(): Observable<User[]>
onUserDeleted(userId: number): void

// Bad
get()
onDelete()

// 7. Lazy load modules/components
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component')
    .then(m => m.AdminComponent)
}

// 8. Use strong typing
// Bad
function calculateTotal(items: any[]): any {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Good
interface Item {
  id: number;
  price: number;
}

function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => sum + item.price, 0);
}
```

---

## Advanced Topics

### Q23: What is RxJS combineLatest and when to use it?

**Answer:**

```typescript
import { combineLatest, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Combine multiple observables
const name$ = new BehaviorSubject('John');
const age$ = new BehaviorSubject(30);
const email$ = new BehaviorSubject('john@example.com');

const user$ = combineLatest([name$, age$, email$]).pipe(
  map(([name, age, email]) => ({
    name,
    age,
    email
  }))
);

user$.subscribe(user => console.log(user));

// Practical example: Filter and search
@Component({
  template: `
    <input [(ngModel)]="filterText" placeholder="Filter...">
    <select [(ngModel)]="sortBy">
      <option>Name</option>
      <option>Date</option>
    </select>
    <div *ngFor="let item of filteredItems$ | async">
      {{ item.name }}
    </div>
  `
})
export class FilterComponent {
  filterText = '';
  sortBy = 'Name';

  filteredItems$: Observable<Item[]>;

  constructor(private itemService: ItemService) {
    this.filteredItems$ = combineLatest([
      this.itemService.getItems(),
      this.getFilterChanges(),
      this.getSortChanges()
    ]).pipe(
      map(([items, filter, sort]) => {
        return items
          .filter(item => item.name.includes(filter))
          .sort((a, b) => {
            if (sort === 'Name') {
              return a.name.localeCompare(b.name);
            }
            return new Date(a.date).getTime() - new Date(b.date).getTime();
          });
      })
    );
  }

  private getFilterChanges() {
    return new BehaviorSubject(this.filterText);
  }

  private getSortChanges() {
    return new BehaviorSubject(this.sortBy);
  }
}
```

---

### Q24: What is the difference between forkJoin and zip?

**Answer:**

```typescript
import { forkJoin, zip } from 'rxjs';

// forkJoin - Wait for all observables to complete, emit last values
const source1$ = of(1, 2, 3);
const source2$ = of('a', 'b', 'c');
const source3$ = of('X', 'Y', 'Z');

forkJoin([source1$, source2$, source3$]).subscribe(
  ([num, letter, symbol]) => {
    console.log(num, letter, symbol); // 3, c, Z (last values only)
  }
);

// zip - Combine corresponding values from each observable
zip(source1$, source2$, source3$).subscribe(
  ([num, letter, symbol]) => {
    console.log(num, letter, symbol);
    // Output:
    // 1, a, X
    // 2, b, Y
    // 3, c, Z
  }
);

// Practical: Parallel API calls
@Injectable()
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(userId: number) {
    return forkJoin({
      user: this.http.get(`/api/users/${userId}`),
      posts: this.http.get(`/api/posts?userId=${userId}`),
      comments: this.http.get(`/api/comments?userId=${userId}`)
    });
  }
}

// Usage
this.userProfileService.getUserProfile(1).subscribe(
  ({ user, posts, comments }) => {
    console.log('User:', user);
    console.log('Posts:', posts);
    console.log('Comments:', comments);
  }
);
```

---

### Q25: Explain Module Federation in Angular.

**Answer:**

Module Federation allows you to load micro-frontends dynamically.

```typescript
// webpack.config.js (Host application)
const { share, withModuleFederationPlugin } = 
  require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'shell',
  filename: 'remoteEntry.js',
  exposes: {
    './SharedModule': './src/app/shared/shared.module.ts'
  },
  shared: share({
    '@angular/core': { singleton: true, strictVersion: true },
    '@angular/common': { singleton: true, strictVersion: true },
    'rxjs': { singleton: true, strictVersion: true }
  })
});

// webpack.config.js (Remote application)
module.exports = withModuleFederationPlugin({
  name: 'mfeApp',
  filename: 'remoteEntry.js',
  exposes: {
    './Module': './src/app/remote/remote.module.ts'
  },
  shared: share({
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true }
  })
});

// Shell app routing
const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './Module'
    }).then(m => m.RemoteModule)
  }
];
```

---

## Conclusion

These 25 questions cover the essential and advanced topics of Angular interview preparation. Study the code examples thoroughly and practice implementing them in your projects.

**Key Takeaways:**
- Understand component lifecycle and data binding
- Master RxJS observables and operators
- Know how to optimize performance with OnPush and TrackBy
- Practice building services with dependency injection
- Write testable code with proper structure
- Follow security best practices
- Keep up with Angular updates and modern patterns
