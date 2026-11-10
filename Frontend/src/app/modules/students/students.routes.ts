import { Routes } from '@angular/router';
import { CreateStudent } from './pages/create-student/create-student';
import { DetailStudent } from './pages/detail-student/detail-student';
import { ListStudents } from './pages/list-students/list-students';
import { UpdateStudent } from './pages/update-student/update-student';

export const studentRoutes: Routes = [
  {
    path: 'students',
    children: [
      { path: 'list', component: ListStudents },
      { path: 'create', component: CreateStudent },
      { path: 'update/:id', component: UpdateStudent },
      { path: 'detail/:id', component: DetailStudent },
      { path: '**', redirectTo: 'list' },
    ],
  },
];
