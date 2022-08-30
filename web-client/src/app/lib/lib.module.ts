import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesFormComponent } from './courses-form/courses-form.component';
import { EventsFormComponent } from './events-form/events-form.component';


@NgModule({
  declarations: [
    CoursesFormComponent,
    EventsFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CoursesFormComponent,
    EventsFormComponent
  ],
})
export class LibModule { }
