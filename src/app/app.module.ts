import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PipePipe } from './core/pipes/pipe.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/utils/material/material.module';
import { AuthService } from './core/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ContactPageComponent } from './modules/pages/private/contact-page/contact-page.component';
import { ToastrInterceptor } from './core/interceptors/toastr.interceptor';
import { NgxSkeletonComponent } from './components/ngx-skeleton/ngx-skeleton.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

export function storageData(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    PipePipe,
    ContactPageComponent,
    NgxSkeletonComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: storageData,
      deps: [AuthService],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ToastrInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      titleClass: 'title',
      timeOut: 1300,
    }),
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'loading...',
    }),
  ],
})
export class AppModule {}
