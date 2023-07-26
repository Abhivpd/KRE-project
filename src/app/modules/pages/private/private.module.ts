import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivateRoutingModule } from './private-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { MaterialModule } from 'src/app/core/utils/material/material.module';
import { LogoutModalComponent } from './modals/logout-modal/logout-modal.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { ToastrModule } from 'ngx-toastr';
import { BarGraphComponent } from './d3/bar-graph/bar-graph.component';
import { PieChartComponent } from './d3/pie-chart/pie-chart.component';
import { LineChartComponent } from './d3/line-chart/line-chart.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GraphSkeletonComponent } from './d3/graph-skeleton/graph-skeleton.component';
import { StoreModule } from '@ngrx/store';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';
import { CounterActionsComponent } from './counter/counter-actions/counter-actions.component';
import { counterReducer } from './counter/store/counter.reducer';
import { MatButtonModule } from '@angular/material/button';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './counter/store/counter.effects';

@NgModule({
  declarations: [
    UserDashboardComponent,
    LogoutModalComponent,
    UserHomepageComponent,
    UserAboutComponent,
    BarGraphComponent,
    PieChartComponent,
    LineChartComponent,
    GraphSkeletonComponent,
    CounterOutputComponent,
    CounterActionsComponent,
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    MaterialModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-left',
    }),
    NgxSkeletonLoaderModule.forRoot({
      animation: 'pulse',
      loadingText: 'loading...',
    }),
    StoreModule.forRoot({ counter: counterReducer }),
    // EffectsModule.forRoot([CounterEffects]),
    MatButtonModule,
  ],
})
export class PrivateModule {}
