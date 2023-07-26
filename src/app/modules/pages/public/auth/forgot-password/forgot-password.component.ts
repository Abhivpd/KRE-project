import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  isHandSet: boolean = false;
  forgotPasswordForm!: FormGroup;
  submitForm: boolean = false;
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private responsive: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
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

  onSubmit() {
    if (this.forgotPasswordForm.controls['email'].valid) {
      this.submitForm = true;
      console.log(this.forgotPasswordForm.value);
      this.email = this.forgotPasswordForm.value.email;
    }
  }
}
