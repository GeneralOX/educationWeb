import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss']
})
export class StudentSidebarComponent implements OnInit {

  links = [
    { name: "Dashboard", url: "/student" },
    { name: "My Courses", url: "/student/my-courses" },
    { name: "Explorer Courses", url: "/student/courses" },
    { name: "Explorer Events", url: "/student/events" },
  ]
  constructor(private api: ApiService, private router: Router) { }


  ngOnInit(): void {
  }

  logout() {
    this.api.auth.clearLocal();
    this.router.navigate(["/"])
  }

}
