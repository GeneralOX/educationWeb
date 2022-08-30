import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userForm = new FormGroup({
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

  ngOnInit(): void {

  }
  onSubmit() {
    if (!this.userForm.valid)
      return alert("All the field are required!")
    console.log(this.userForm.value)
    this.apiService.auth.UserLogin(this.userForm)
      .subscribe(
        (res: any) => {
          if (res.success) {
            const redirect = this.apiService.auth.PermissionRedirect(res.payload.role);
            this.apiService.auth.setLocal(res.payload);
            this.router.navigate([redirect]);
          }
          else {
            alert(res.message);
          }
        })
  }
}
