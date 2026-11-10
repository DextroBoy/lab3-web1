import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { AlertService } from '../../../shared/services/alert.service';
import { TableCourses } from '../../components/table-courses/table-courses';
import { Course } from '../../interfaces/course';
import { TableCoursesEvent } from '../../interfaces/table-courses';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-list-courses',
  imports: [Button, TableCourses],
  templateUrl: './list-courses.html',
})
export class ListCourses {
  courses: Course[] = [];

  readonly createButton: ButtonConfig = {
    id: 'create-course',
    title: 'Crear curso',
    type: 'primary',
  };

  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    this.loadCourses();
  }

  private loadCourses(): void {
    this.courseService.getAll().subscribe({
      next: (courses) => (this.courses = courses),
      error: (error) => {
        console.error('Error fetching courses:', error);
        this.alertService.toast('Error al consultar los cursos', 'error');
      },
    });
  }

  createCourse(): void {
    this.router.navigateByUrl('/courses/create');
  }

  handleAction({ id, action }: TableCoursesEvent): void {
    if (action === 'detail') this.router.navigateByUrl(`/courses/detail/${id}`);
    if (action === 'edit') this.router.navigateByUrl(`/courses/update/${id}`);
    if (action === 'delete') void this.deleteCourse(id);
  }

  private async deleteCourse(id: number): Promise<void> {
    const confirmed = await this.alertService.confirm(
      '¿Está seguro?',
      `Se va a eliminar el curso ${id}`,
    );
    if (!confirmed) return;

    this.courseService.delete(id).subscribe({
      next: () => {
        this.alertService.toast('Curso eliminado correctamente', 'success');
        this.loadCourses();
      },
      error: (error) => {
        console.error('Error deleting course:', error);
        this.alertService.toast('Error al eliminar el curso', 'error');
      },
    });
  }
}
