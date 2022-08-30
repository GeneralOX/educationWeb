import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html'
})
export class CoursesFormComponent {

  @Input() uid: string = "";
  @Input() course: any = {};

  form = new FormGroup({
    title: new FormControl(this.course.title, Validators.required),
    subtitle: new FormControl("", Validators.required),
    imgUrl: new FormControl("", Validators.required),
    places: new FormControl(0, Validators.required),
  });
  @Output() objectChanged: EventEmitter<typeof this.form> = new EventEmitter();
  constructor() {
    const _interval = setInterval(() => {
      if (this.uid != "") {
        this.form.setValue({ title: this.course.title, subtitle: this.course.subtitle, places: this.course.places, imgUrl: this.course.imgUrl });
        clearInterval(_interval);
      }
    }, 100);
  }
  onSubmit() {
    this.objectChanged.emit(this.form);
  }
}
