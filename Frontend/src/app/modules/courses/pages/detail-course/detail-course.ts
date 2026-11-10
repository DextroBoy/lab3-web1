import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Course } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-detail-course',
  imports: [Back],
  templateUrl: './detail-course.html',
})
export class DetailCourse {
  course: Course | null = null;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly alertService = inject(AlertService);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!Number.isInteger(id) || id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.router.navigateByUrl('/courses');
      return;
    }
    this.courseService.getById(id).subscribe({
      next: (course) => (this.course = course),
      error: (error) => {
        console.error('Error fetching course:', error);
        this.alertService.toast('Error al consultar el curso', 'error');
        this.router.navigateByUrl('/courses');
      },
    });
  }
}
