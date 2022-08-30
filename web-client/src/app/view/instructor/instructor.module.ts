import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { LibModule } from 'src/app/lib/lib.module';
import { ApiService } from 'src/app/api.service';

import { InstructorComponent } from './instructor.component';
import { CoursesDetailsComponent } from './courses-details/courses-details.component';
import { EventsComponent } from './events/events.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CoursesComponent } from './courses/courses.component';
import { EventsDetailsComponent } from './events-details/events-details.component';
import { ParticipantComponent } from './participant/participant.component';


const routes: Routes = [
  {
    path: "", component: InstructorComponent, children: [
      { path: "courses", component: CoursesComponent },
      { path: "course", component: CoursesDetailsComponent },
      { path: "course/:id", component: CoursesDetailsComponent },
      { path: "course/participant/:id", component: ParticipantComponent },

      { path: "events", component: EventsComponent },
      { path: "event", component: EventsDetailsComponent },
      { path: "event/:id", component: EventsDetailsComponent },
    ]
  }
];

@NgModule({
  declarations: [
    InstructorComponent,
    SidebarComponent,
    CoursesComponent,
    CoursesDetailsComponent,
    EventsComponent,
    EventsDetailsComponent,
    ParticipantComponent,
  ],
  imports: [
    CommonModule,
    LibModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [ApiService]
})
export class InstructorModule { }
