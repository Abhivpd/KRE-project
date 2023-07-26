import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IaboutData } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.scss'],
})
export class UserAboutComponent implements OnInit {
  about!: IaboutData;
  loader: boolean = true;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.onAbout().subscribe({
      next: (response) => {
        this.about = response;
        console.log(response);
        this.loader = false;
      },
      error: (error) => {
        console.log(error);
        setTimeout(() => {
          this.router.navigate(['']);
        }, 200);
      },
    });
  }
}
