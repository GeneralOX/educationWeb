import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(private apiService: ApiService, private router: Router) {
    const obj = this.apiService.auth.getLocal();
    if (obj != null) {
      const user = JSON.parse(obj);
      const redirect = this.apiService.auth.PermissionRedirect(user.role);
      this.router.navigate([redirect]);
    }
  }
  ngOnInit(): void { }
  onSubmit() {
    if (!this.userForm.valid)
      return alert("All the field are required!")
    console.log(this.userForm.value)
    this.apiService.auth.register(this.userForm)
      .subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(["confirm"]);
          }
          else {
            alert(res.message);
          }
        })
  }
}
