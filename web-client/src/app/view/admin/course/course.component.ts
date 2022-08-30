import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  constructor(private api: ApiService) {
    this.api.course.CourseAll().subscribe((res: any) => { this.courses = res.courses })
  }

  ngOnInit(): void {
  }

  courseDelete(id: any) {
    this.api.course.CourseDelete(id).subscribe((res: any) => {
      if (res.deleted) {
        this.courses = this.courses.filter((v) => v._id != id);
      }
    })
  }
}
