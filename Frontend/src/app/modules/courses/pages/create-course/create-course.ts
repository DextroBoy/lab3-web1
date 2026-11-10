import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { CreateCourseRequest } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-create-course',
  imports: [Back, ReactiveFormsModule],
  templateUrl: './create-course.html',
})
export class CreateCourse {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);

  readonly semesters = Array.from({ length: 10 }, (_, index) => index + 1);
  readonly credits = Array.from({ length: 10 }, (_, index) => index + 1);

  readonly courseForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    credits: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    semester: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    status: [true],
  });

  createCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }

    const course: CreateCourseRequest = this.courseForm.getRawValue();
    this.courseService.create(course).subscribe({
      next: () => {
        this.alertService.toast('Curso registrado correctamente', 'success');
        this.router.navigateByUrl('/courses');
      },
      error: (error) => {
        console.error('Error creating course:', error);
        this.alertService.toast('Error al crear el curso', 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/courses');
  }
}
