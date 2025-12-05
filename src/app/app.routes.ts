import { Routes } from '@angular/router';
import { UserListComponent } from './users/pages/user-list/user-list.component';
import { SubmissionComponent } from './submission/submission.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'submissions', component: SubmissionComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];
