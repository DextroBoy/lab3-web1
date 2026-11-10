import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Back } from '../../../shared/components/back/back';
import { AlertService } from '../../../shared/services/alert.service';
import { Course, UpdateCourseRequest } from '../../interfaces/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-update-course',
  imports: [Back, ReactiveFormsModule],
  templateUrl: './update-course.html',
})
export class UpdateCourse {
  id!: number;
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly alertService = inject(AlertService);
  private readonly courseService = inject(CourseService);

  readonly semesters = Array.from({ length: 10 }, (_, index) => index + 1);
  readonly credits = Array.from({ length: 10 }, (_, index) => index + 1);
  readonly courseForm = this.fb.nonNullable.group({
    id: [{ value: 0, disabled: true }],
    name: ['', [Validators.required, Validators.maxLength(100)]],
    description: ['', Validators.required],
    credits: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    semester: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    status: [true],
  });

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    this.id = Number(paramId);
    if (!paramId || !Number.isInteger(this.id) || this.id <= 0) {
      this.alertService.toast('Identificación no válida', 'error');
      this.goToList();
      return;
    }
    this.courseService.getById(this.id).subscribe({
      next: (course) => this.setValues(course),
      error: (error) => {
        console.error('Error fetching course:', error);
        this.alertService.toast('Error al consultar el curso', 'error');
        this.goToList();
      },
    });
  }

  private setValues(course: Course): void {
    this.courseForm.patchValue(course);
  }

  updateCourse(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
      return;
    }
    const { id: _id, ...course } = this.courseForm.getRawValue();
    const request: UpdateCourseRequest = course;
    this.courseService.update(this.id, request).subscribe({
      next: () => {
        this.alertService.toast('Curso actualizado correctamente', 'success');
        this.goToList();
      },
      error: (error) => {
        console.error('Error updating course:', error);
        this.alertService.toast('Error al actualizar el curso', 'error');
      },
    });
  }

  goToList(): void {
    this.router.navigateByUrl('/courses');
  }
}
