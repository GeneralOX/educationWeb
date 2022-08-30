import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-courses-details',
  template: `<app-courses-form
[uid]="courseId"
[course]="courseObj"
(objectChanged)="formChangedHandler($event)"
></app-courses-form>`
})
export class CoursesDetailsComponent implements OnInit {

  isNew = true;
  userId = "";
  courseId = "";
  courseObj: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

    const obj = apiService.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.userId = usr._id;
    }

    route.params.subscribe((r: any) => {
      if (r.id) {
        console.log("edit")
        this.isNew = false;
        apiService.course.CourseOne(r.id).subscribe((res: any) => {
          this.courseObj = res.course
          this.courseId = (r.id);
        })
      }
      else {
        this.isNew = true;
        console.log("new")
      }
    });
  }

  ngOnInit(): void { }

  formChangedHandler(data: FormGroup) {
    console.log({ data, id: this.userId })
    if (!data.valid)
      return alert("All the field are required!")
    if (this.isNew) {
      this.apiService.course.CourseCreate(this.userId, data.value).subscribe((res: any) => {
        alert("course have been created!")
      })
    } else {

      this.apiService.course.CourseUpdate(this.courseId, data.value).subscribe((res: any) => {
        if (res.success)
          alert("course have been updated")
        else
          alert(res.message)
      })
    }
  }
}

