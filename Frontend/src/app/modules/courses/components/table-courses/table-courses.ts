import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Button } from '../../../shared/components/button/button';
import { ButtonConfig } from '../../../shared/interfaces/button';
import { Course } from '../../interfaces/course';
import { TableCoursesAction, TableCoursesEvent } from '../../interfaces/table-courses';

@Component({
  selector: 'app-table-courses',
  imports: [Button],
  templateUrl: './table-courses.html',
})
export class TableCourses {
  @Input() courses: Course[] = [];
  @Output() action = new EventEmitter<TableCoursesEvent>();

  readonly detailButton: ButtonConfig = {
    id: 'detail',
    type: 'primary',
    icon: 'eye',
    outline: true,
    size: 'sm',
  };

  readonly editButton: ButtonConfig = {
    id: 'update',
    type: 'warning',
    icon: 'pencil-square',
    outline: true,
    size: 'sm',
  };

  readonly deleteButton: ButtonConfig = {
    id: 'delete',
    type: 'danger',
    icon: 'trash',
    outline: true,
    size: 'sm',
  };

  emitAction(id: number, action: TableCoursesAction): void {
    this.action.emit({ id, action });
  }
}
