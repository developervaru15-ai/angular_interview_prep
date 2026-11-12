import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'parent',
  },
  {
    path: 'parent',
    loadChildren: () =>
      import('./components/parent-component/parent-component-module').then(
        (module) => module.ParentComponentModule,
      ),
  },
  {
    path: 'child',
    loadComponent: () =>
      import('./components/child-component/child-component').then(
        (module) => module.ChildComponent,
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/user-list-example/user-list-example.component').then(
        (module) => module.UserListExampleComponent,
      ),
  },
  {
    path: '**',
    redirectTo: 'parent',
  },
];
