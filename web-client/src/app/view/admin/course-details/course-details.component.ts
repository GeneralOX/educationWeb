import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import courseFormModel from 'src/app/models/courseForm.model';

@Component({
  selector: 'app-course-details',
  template: `<app-courses-form
  [uid]="courseId"
  [course]="courseObj"
  (objectChanged)="formChangedHandler($event)"
></app-courses-form>`
})
export class CourseDetailsComponent implements OnInit {

  courseId = "";
  courseObj: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    route.params.subscribe((r: any) => {
      apiService.admin.CourseOne(r.id).subscribe((res: any) => {
        this.courseObj = res.course
        this.courseId = (r.id);
      })
    });
  }

  ngOnInit(): void { }

  formChangedHandler(data: FormGroup) {
    console.log(data)
    if (!data.valid)
      return alert("All the field are required!")

    this.apiService.admin.CourseUpdate(this.courseId, data.value).subscribe((res: any) => {
      if (res.success)
        alert("course have been updated")
      else
        alert(res.message)
    })
  }
}
