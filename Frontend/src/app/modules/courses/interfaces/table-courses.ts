export interface TableCoursesEvent {
  id: number;
  action: TableCoursesAction;
}

export type TableCoursesAction = 'detail' | 'edit' | 'delete';
