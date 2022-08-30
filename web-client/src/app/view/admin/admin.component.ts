import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';

@Component({
    selector: 'app-admin',
    template: `<div class="flex"><app-sidebar></app-sidebar><div class="px-8 flex-1"><router-outlet></router-outlet></div></div>`
})
export class AdminComponent implements OnInit {

    users: any[] = []
    constructor(private api: ApiService) { }

    ngOnInit(): void { }
}
