import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }


  ngOnInit(): void {
  }

  logout() {
    this.api.auth.clearLocal();
    this.router.navigate(["/"])
  }

}
