import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  http = inject(HttpClient);
  router = inject(Router);

  onLogin(): void {
    if (this.loginForm.valid) {
      const loginObj = this.loginForm.value;
      this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login", loginObj).subscribe((res: any) => {
        if (res.result) {
          localStorage.setItem('employeeApp', JSON.stringify(res.data));
          this.router.navigateByUrl('dashboard');
        } else {
          alert(res.message)
        }
      })
    }
  }
}



