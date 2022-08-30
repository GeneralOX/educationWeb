import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: any[] = []
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.admin.UserAll().subscribe((res: any) => { this.users = res })
  }

  getRole(n: number) {
    if (n == 3)
      return "student"
    else if (n == 2)
      return "instructor"
    else if (n == 1)
      return "admin"
    else
      return "null"
  }

  userConfirm(id: any) {
    this.api.admin.UserConfirm(id).subscribe((res: any) => {
      this.users = this.users.map((v) => {
        if (v._id == id) v.status = true;
        return v;
      })
    })

  }
  userDelete(id: any) {
    this.api.admin.UserDelete(id).subscribe((res: any) => {
      this.users = this.users.filter((v) => v._id != id);
    })

  }
}
