import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-event',
  templateUrl: './student-event.component.html',
  styleUrls: ['./student-event.component.scss']
})
export class StudentEventComponent implements OnInit {
  events: any[] = []
  constructor(private api: ApiService) {
    api.event.EventAll().subscribe((r: any) => {
      console.log(r.events)
      this.events = r.events
    })
  }

  ngOnInit(): void {
  }

}
