import { Component } from '@angular/core';
import { ToastrNotifierService } from './core/services/toastr-notifier.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'DEMO-APP';
  count = 1;
  constructor(private toastrService: ToastrNotifierService) {}
}
