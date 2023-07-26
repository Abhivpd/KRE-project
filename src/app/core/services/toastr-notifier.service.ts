import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrNotifierService {
  constructor(private toastr: ToastrService) {}

  showSuccess(message: string, title: string) {
    this.toastr.success(
      message,
      title
      //   {
      //   easing: 'ease-in',
      //   easeTime: 1000,
      // }
    );
  }
  
  showWarning(message: string) {
    this.toastr.warning(message);
  }
}
