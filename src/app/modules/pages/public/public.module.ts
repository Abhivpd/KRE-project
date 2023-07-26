import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { MaterialModule } from 'src/app/core/utils/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './auth/signup/signup.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    SignupComponent,
    SignInComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({}),
  ],
})
export class PublicModule {}
