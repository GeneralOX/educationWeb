import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-course',
  templateUrl: './student-course.component.html',
  styleUrls: ['./student-course.component.scss']
})
export class StudentCourseComponent implements OnInit {

  public courses: any[] = []
  userId: string = ""
  constructor(private api: ApiService) {
    const obj = api.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.userId = usr._id;
    }
    api.course.CourseAll().subscribe((r: any) => {
      this.courses = r.courses;
    })
  }

  ngOnInit(): void {
  }

  joinCourse(id: any) {
    this.api.course.CourseJoin(this.userId, id).subscribe((res: any) => {
      console.log(res)
      alert(res.message)
    })
  }
}
