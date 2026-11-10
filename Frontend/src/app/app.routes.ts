import { Routes } from '@angular/router';
import { courseRoutes } from './modules/courses/courses.routes';
import { studentRoutes } from './modules/students/students.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  ...studentRoutes,
  ...courseRoutes,
];
