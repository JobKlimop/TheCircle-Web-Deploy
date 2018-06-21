import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onLogin() {
    const userData = this.loginForm.value;
    if (userData.username === '' || userData.password === ' ') {
      this.toastr.warning('Please fill in your username & password.', 'Fields required');
    } else {
      this.authService.login(userData.username, userData.password)
        .then(() => {
          this.router.navigateByUrl('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
