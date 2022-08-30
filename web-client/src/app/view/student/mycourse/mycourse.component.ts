import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-mycourse',
  templateUrl: './mycourse.component.html',
  styleUrls: ['./mycourse.component.scss']
})
export class MycourseComponent implements OnInit {
  userId: any = "";
  courses: any[] = []
  constructor(private api: ApiService) {
    const obj = api.auth.getLocal();
    if (obj) {
      const usr = JSON.parse(obj)
      this.userId = usr._id;
      api.user.GetDetails(usr._id).subscribe(
        (res: any) => {
          this.courses = res.course;
        }
      );
    }
  }

  ngOnInit(): void {
  }

}
