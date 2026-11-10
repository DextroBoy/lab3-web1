import { Routes } from '@angular/router';
import { studentRoutes } from './modules/students/students.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  ...studentRoutes,
];
