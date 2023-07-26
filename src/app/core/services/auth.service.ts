import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IaboutData, Ilogindata } from '../models/user.model';
import { ToastrNotifierService } from './toastr-notifier.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: any = '';
  token: any = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrNotifierService
  ) {}

  init() {
    if (this.email !== localStorage.getItem('userEmail')) {
      Promise.reject().catch(() => {
        // this.toastr.showWarning('Authentication Failed');
      });
    } else {
      Promise.resolve(true);
    }
  }

  onLogIn(email: string, password: string) {
    return this.http.post<Ilogindata>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCMoznMqAUDg2Ycs9kemrh9CFNUQDckBU4',
      { email: email, password: password, returnSecureToken: true }
    );
  }

  onAbout() {
    const token: any = localStorage.getItem('token');
    return this.http.get<IaboutData>(
      'https://eltp-aims-27398-default-rtdb.firebaseio.com/0.json'
    );
  }
}
