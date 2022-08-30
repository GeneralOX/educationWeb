import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-home',
  template: `
  <div class="flex flex-col">
    <div>
      <app-student-sidebar></app-student-sidebar>
    </div>
    <router-outlet></router-outlet>
  </div>
`
})
export class StudentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
