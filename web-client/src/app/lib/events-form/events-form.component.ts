import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-events-form',
  templateUrl: './events-form.component.html',
})
export class EventsFormComponent implements OnInit {

  @Input() uid: string = "";
  @Input() event: any = {};

  form = new FormGroup({
    title: new FormControl(this.event.title, Validators.required),
    subtitle: new FormControl("", Validators.required),
    imgUrl: new FormControl("", Validators.required),
  });
  @Output() objectChanged: EventEmitter<typeof this.form> = new EventEmitter();
  constructor() {
    const _interval = setInterval(() => {
      if (this.uid != "") {
        this.form.setValue({ title: this.event.title, subtitle: this.event.subtitle, imgUrl: this.event.imgUrl });
        clearInterval(_interval);
      }
    }, 100);
  }
  ngOnInit(): void {
  }
  onSubmit() {
    this.objectChanged.emit(this.form);
  }

}
