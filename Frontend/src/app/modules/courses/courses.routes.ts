import { Routes } from '@angular/router';
import { CreateCourse } from './pages/create-course/create-course';
import { DetailCourse } from './pages/detail-course/detail-course';
import { ListCourses } from './pages/list-courses/list-courses';
import { UpdateCourse } from './pages/update-course/update-course';

export const courseRoutes: Routes = [
  {
    path: 'courses',
    children: [
      { path: 'list', component: ListCourses },
      { path: 'create', component: CreateCourse },
      { path: 'update/:id', component: UpdateCourse },
      { path: 'detail/:id', component: DetailCourse },
      { path: '**', redirectTo: 'list' },
    ],
  },
];
