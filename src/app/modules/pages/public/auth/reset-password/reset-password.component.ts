import { HighContrastModeDetector } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { TileStyler } from '@angular/material/grid-list/tile-styler';
import { Router } from '@angular/router';
import { ToastrNotifierService } from 'src/app/core/services/toastr-notifier.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  hidePassword = true;
  hideConfirmPassword = true;
  hideNewPassword = true;
  isMatch = false;
  // resetPasswordDetails!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrNotifierService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  resetPasswordDetails = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    oldPassword: ['', [Validators.required]],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.compose([
          Validators.minLength(5),
          Validators.pattern(
            '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]+$'
          ),
        ]),
      ],
    ],
    confirmPassword: ['', [Validators.required, this.isPasswordMatch()]],
  });
  isPasswordMatch(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const newPasswordValue = this.resetPasswordDetails?.value?.newPassword;
      const confirmPasswordValue = form.value;
      return newPasswordValue === confirmPasswordValue
        ? null
        : { passswordMismatchError: true };
    };
  }
  onSubmit() {
    console.log(this.resetPasswordDetails);
    if (this.resetPasswordDetails.valid) {
      this.toastr.showSuccess(
        'Your Password is successfully reset',
        'Reset Password'
      );
      setTimeout(() => {
        this.router.navigate(['']);
      }, 700);
    } else {
      this.toastr.showWarning('Invalid credentials');
    }
  }
  ConfirmedValidator(newPassword: string, confirmPassword: string) {
    return (formgroup: FormGroup) => {
      const newPasswordValue = formgroup.controls['newPassword'];
      const confirmPasswordValue = formgroup.controls['confirmPassword'];
      if (
        confirmPasswordValue.errors &&
        !confirmPasswordValue.errors['confirmedValidator']
      ) {
        return;
      }
      if (newPasswordValue.value !== confirmPasswordValue.value) {
        confirmPasswordValue.setErrors({ confirmedValidator: true });
      } else {
        confirmPasswordValue.setErrors(null);
      }
    };
  }
}
