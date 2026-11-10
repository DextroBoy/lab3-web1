export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  semester: number;
  status: boolean;
}

export type CreateCourseRequest = Omit<Course, 'id'>;
export type UpdateCourseRequest = Omit<Course, 'id'>;
