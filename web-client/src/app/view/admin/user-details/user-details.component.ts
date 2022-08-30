import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import courseFormModel from 'src/app/models/courseForm.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html'
})
export class UserDetailsComponent implements OnInit {

  form: courseFormModel = new courseFormModel(
    "",
    new FormGroup({
      name: new FormControl("", Validators.required),
      username: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      role: new FormControl(0, Validators.required),
    })
  );


  userForm = new FormGroup({
    name: new FormControl("", Validators.required),
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    role: new FormControl(0, Validators.required),
  });
  userId = "";



  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    route.params.subscribe((r: any) => this.userId = (r.id));
    apiService.admin.UserOne(this.userId).subscribe((res: any) => {
      this.userForm.setValue({ name: res.user.name, username: res.user.username, password: res.user.password, role: res.user.role })
    })
  }
  ngOnInit(): void { }
  onSubmit() {
    if (!this.userForm.valid)
      return alert("All the field are required!")
    console.log(this.userForm.value)
    this.apiService.admin.UserUpdate(this.userId, this.userForm.value).subscribe((res: any) => {
      if (res.success) {
        this.userForm.setValue({ name: res.user.name, username: res.user.username, password: res.user.password, role: res.user.role })
        alert("user have been updated")
      }
      else {
        alert(res.message)
      }
    })
  }
}
