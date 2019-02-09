import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../service/auth.service';
import {LoginService} from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public username: string;
  public password: string;
  public invalidMessage: string;
  public returnUrl: string;
  public isLoginSubmit = false;

  constructor(public loginService: LoginService, public fb: FormBuilder,
              public router: Router, public route: ActivatedRoute, public auth: AuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [this.username , [Validators.required, Validators.email]],
      password: [this.password , Validators.required]
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.auth.isLoggednIn()) {
      this.router.navigate([this.returnUrl]);
    }

    this.login();
  }

  login() {
    this.isLoginSubmit = true;
    this.username = 'sahil.verma@tothenew.com';
    this.password = 'igdefault';
    this.loginForm.patchValue({'username': this.username});
    this.loginForm.patchValue({'password': this.password});
    console.log(this.loginForm.value);
    if (!this.loginForm.invalid) {
      this.loginService.logIn(this.loginForm.value).subscribe(data => {

          // localStorage.setItem('currentUser', data.json().principal);
          const authorities = data.json().principal.authorities;
          localStorage.setItem('user', JSON.stringify(data.json().principal));
          authorities.forEach(roles => {
            localStorage.setItem('role', roles.authority);

          });
          localStorage.setItem('isAuthenticated', 'true');
        window.location.href = this.returnUrl;
        }, err => {
          if (err.status === 401) {
            this.invalidMessage = 'EmailId Or Password Is Incorrect';
          }
          // this.errorMessage="error :  Username or password is incorrect";
        });
      }
  }


}
