import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

import { Router } from '@angular/router';
import { Ilogindata } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrNotifierService } from 'src/app/core/services/toastr-notifier.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;
  hidePassword = true;
  loginData!: Ilogindata;
  isHandSet: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private toastrService: ToastrNotifierService,
    private responsive: BreakpointObserver
  ) {}
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.responsive.observe(Breakpoints.Handset).subscribe((result) => {
      if (result.matches) {
        this.isHandSet = true;
      } else {
        this.isHandSet = false;
      }
      console.log(this.isHandSet);
    });
  }

  onLogin() {
    if (
      this.loginForm.value.email !== '' &&
      this.loginForm.value.password !== ''
    ) {
      this.authService
        .onLogIn(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe({
          next: (response) => {
            this.loginData = response;
            console.log(this.loginData, 'data');

            localStorage.setItem('userEmail', this.loginData.email);
            localStorage.setItem('token', this.loginData.idToken);
            this.authService.email = localStorage.getItem('userEmail');
            this.authService.token = localStorage.getItem('token');
            sessionStorage.setItem('token', this.loginData.idToken);

            this.route.navigate(['user/home']);
            this.toastrService.showSuccess(
              'You have successfully logged in',
              'Log In'
            );
          },
          error: (error) => {
            console.log(error);
            this.toastrService.showWarning(error.message);
          },
        });

      //   (data) => {
      //   this.loginData = data;
      //   console.log(this.loginData, 'data');

      //   localStorage.setItem('userEmail', this.loginData.email);
      //   localStorage.setItem('token', this.loginData.idToken);
      //   this.authService.email = localStorage.getItem('userEmail');
      //   this.authService.token = localStorage.getItem('token');
      //   sessionStorage.setItem('token', this.loginData.idToken);

      //   this.route.navigate(['user/home']);
      //   this.toastrService.showSuccess(
      //     'You have successfully logged in',
      //     'Log In'
      //   );
      // });
    }
  }
  onForgotPassword() {
    this.route.navigate(['/forgot-password']);
  }

  onSignUp() {
    this.toastrService.showSuccess(
      'You have logged out successfully',
      'Logged Out'
    );
    this.route.navigate(['/reset-password']);
  }
}
