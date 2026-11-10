import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course, CreateCourseRequest, UpdateCourseRequest } from '../interfaces/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/api/courses';

  getAll(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url);
  }

  getById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.url}/${id}`);
  }

  create(course: CreateCourseRequest): Observable<Course> {
    return this.http.post<Course>(this.url, course);
  }

  update(id: number, course: UpdateCourseRequest): Observable<Course> {
    return this.http.put<Course>(`${this.url}/${id}`, course);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
