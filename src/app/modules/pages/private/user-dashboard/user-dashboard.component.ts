import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  HostListener,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrNotifierService } from 'src/app/core/services/toastr-notifier.service';
import { LogoutModalComponent } from '../modals/logout-modal/logout-modal.component';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  isOpened: boolean = false;
  Window: any = window;
  isHandSet: boolean = false;
  displayChart: boolean = false;
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrNotifierService,
    private responsive: BreakpointObserver
  ) {}

  // @HostListener('window:storage')
  // onStorageChange() {
  //   this.onchange();
  // }

  onchange() {
    this.router.navigate(['']);
    localStorage.clear();
  }

  toggleChart() {
    this.displayChart = !this.displayChart;
  }

  ngOnInit(): void {
    // console.log('Web ' + Breakpoints.Web);
    // console.log('WebLandscape ' + Breakpoints.WebLandscape);
    // console.log('WebPortrait ' + Breakpoints.WebPortrait);

    // console.log('Tablet ' + Breakpoints.Tablet);
    // console.log('TabletPortrait ' + Breakpoints.TabletPortrait);
    // console.log('TabletLandscape ' + Breakpoints.TabletLandscape);

    // console.log('Handset ' + Breakpoints.Handset);
    // console.log('HandsetLandscape ' + Breakpoints.HandsetLandscape);
    // console.log('HandsetPortrait ' + Breakpoints.HandsetPortrait);

    // console.log('XSmall ' + Breakpoints.XSmall);
    // console.log('Small ' + Breakpoints.Small);
    // console.log('Medium ' + Breakpoints.Medium);
    // console.log('Large ' + Breakpoints.Large);
    // console.log('XLarge ' + Breakpoints.XLarge);
    this.responsive.observe(Breakpoints.Handset).subscribe((result) => {
      if (result.matches) {
        console.log(result);
        this.isHandSet = true;
      } else {
        this.isHandSet = false;
      }
      console.log(this.isHandSet);
    });
  }

  toggle() {
    this.isOpened = !this.isOpened;
  }

  onLogout() {
    const dialogRef = this.dialog.open(LogoutModalComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data === 'logout') {
        this.router.navigate(['']);
        this.toastrService.showSuccess(
          'You have logged out successfully',
          'Logged Out'
        );
        localStorage.clear();
      }
    });
  }
}
