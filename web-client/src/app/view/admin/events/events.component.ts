import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any[] = []
  constructor(private api: ApiService) {
    this.load()
  }

  ngOnInit(): void {
  }
  load() {
    const obj = this.api.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.api.event.EventAll().subscribe((res: any) => this.events = res.events);
    }
  }
  eventDelete(id: string) {
    this.api.event.EventDelete(id).subscribe((res: any) => {
      this.load()
    });
  }

}
