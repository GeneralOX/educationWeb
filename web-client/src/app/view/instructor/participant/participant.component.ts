import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-participant',
  templateUrl: './participant.component.html',
  styleUrls: ['./participant.component.scss']
})
export class ParticipantComponent implements OnInit {

  participants: any[] = []
  constructor(private api: ApiService, private route: ActivatedRoute) {
    
    route.params.subscribe((r: any) => {
      if (r.id) {
        api.course.CourseParticipants(r.id).subscribe((res:any) => {
          this.participants = res.users
          
        })

      }
    });
  }

  ngOnInit(): void {
  }

}
