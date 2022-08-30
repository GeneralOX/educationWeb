import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-instructor',
    template: `<div class="flex"><app-sidebar></app-sidebar><div class="px-8 flex-1"><router-outlet></router-outlet></div></div>`
})
export class InstructorComponent implements OnInit {

    users: any[] = []
    constructor(private api: ApiService) { }

    ngOnInit(): void { }
}
