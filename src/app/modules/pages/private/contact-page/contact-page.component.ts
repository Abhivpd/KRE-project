import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.scss'],
})
export class ContactPageComponent implements OnInit {
  data: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.onAbout().subscribe((data) => {
      this.data = data;
    });
  }
}
