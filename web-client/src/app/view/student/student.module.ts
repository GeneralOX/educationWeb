import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from 'src/app/api.service';

import { StudentComponent } from './student.component';
import { StudentSidebarComponent } from './components/student-sidebar/student-sidebar.component';
import { StudentCourseComponent } from './student-course/student-course.component';
import { StudentEventComponent } from './student-event/student-event.component';
import { MycourseComponent } from './mycourse/mycourse.component';


const routes: Routes = [
  {
    path: "", component: StudentComponent, children: [
      { path: "courses", component: StudentCourseComponent },
      { path: "events", component: StudentEventComponent },
      { path: "my-courses", component: MycourseComponent },
    ]
  },
];

@NgModule({
  declarations: [
    StudentComponent,
    StudentSidebarComponent,
    StudentCourseComponent,
    StudentEventComponent,
    MycourseComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [ApiService]
})
export class StudentModule { }
