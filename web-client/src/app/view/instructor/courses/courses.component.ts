import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses: any[] = []
  constructor(private api: ApiService) {
    this.load()
  }

  ngOnInit(): void {
  }
  load() {
    const obj = this.api.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.api.course.CourseByUser(usr._id).subscribe((res: any) => this.courses = res.courses);
    }
  }
  courseDelete(id: string) {
    this.api.course.CourseDelete(id).subscribe((res: any) => {
      this.load()
    });
  }
}
