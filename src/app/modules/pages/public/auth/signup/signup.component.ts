import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrNotifierService } from 'src/app/core/services/toastr-notifier.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  hidePassword = true;
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrNotifierService,
    private router: Router
  ) {}
  signupForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    PhoneNumber: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ],
    ],
    terms: ['', Validators.required],
  });
  ngOnInit(): void {}
  get phoneNumber() {
    return this.signupForm.controls;
  }
  onSignUp() {
    console.log(this.signupForm);
    this.isSubmitted = true;
    if (this.signupForm.valid && this.signupForm.controls.terms.valid) {
      console.log(this.signupForm.value);
      this.toastrService.showSuccess('Successfully Signed up', 'Sign Up');
      this.router.navigate(['']);
      this.signupForm.reset();
    } else {
      this.toastrService.showWarning('Invalid credentials');
    }
  }
}
