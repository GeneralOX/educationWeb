import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { ApiService } from 'src/app/api.service';

import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';
import { CourseComponent } from './course/course.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LibModule } from 'src/app/lib/lib.module';
import { EventsComponent } from './events/events.component';
import { EventsDetailsComponent } from './events-details/events-details.component';

const routes: Routes = [
  {
    path: "", component: AdminComponent, children: [
      { path: "users", component: UsersComponent },
      { path: "user/:id", component: UserDetailsComponent },
      { path: "courses", component: CourseComponent },
      { path: "course/:id", component: CourseDetailsComponent },

      { path: "events", component: EventsComponent },
      { path: "event/:id", component: EventsDetailsComponent },
    ]
  },
  { path: "**", redirectTo: "/admin/users" }
];

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    UserDetailsComponent,
    CourseComponent,
    CourseDetailsComponent,
    SidebarComponent,
    EventsComponent,
    EventsDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    LibModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ApiService],
})
export class AdminModule { }
