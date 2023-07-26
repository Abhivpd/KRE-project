import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent implements OnInit {
  email: string | any = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email = localStorage.getItem('userEmail');
  }
}
