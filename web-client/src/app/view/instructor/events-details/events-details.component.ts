import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-events-details',
  template: `<app-events-form
  [uid]="eventId"
  [event]="eventObj"
  (objectChanged)="formChangedHandler($event)"
  ></app-events-form>`
})
export class EventsDetailsComponent implements OnInit {

  isNew = true;
  userId = "";
  eventId = "";
  eventObj: any;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {

    const obj = apiService.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.userId = usr._id;
    }

    route.params.subscribe((r: any) => {
      if (r.id) {
        this.isNew = false;
        apiService.event.EventOne(r.id).subscribe((res: any) => {
          this.eventObj = res.event
          this.eventId = (r.id);
        })
      }
      else {
        this.isNew = true;
      }
    });
  }

  ngOnInit(): void { }

  formChangedHandler(data: FormGroup) {
    console.log({ data, id: this.userId })
    if (!data.valid)
      return alert("All the field are required!")
    if (this.isNew) {
      this.apiService.event.EventCreate(this.userId, data.value).subscribe((res: any) => {
        alert("event have been created!")
      })
    } else {

      this.apiService.event.EventUpdate(this.eventId, data.value).subscribe((res: any) => {
        if (res.success)
          alert("event have been updated")
        else
          alert(res.message)
      })
    }
  }
}
