import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { BarGraphComponent } from './d3/bar-graph/bar-graph.component';
import { LineChartComponent } from './d3/line-chart/line-chart.component';
import { PieChartComponent } from './d3/pie-chart/pie-chart.component';
import { UserAboutComponent } from './user-about/user-about.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { CounterOutputComponent } from './counter/counter-output/counter-output.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: 'home',
        component: UserHomepageComponent,
      },
      {
        path: 'about',
        component: UserAboutComponent,
        children: [
          {
            path: 'contact-us',
            component: ContactPageComponent,
          },
        ],
      },
      {
        path: 'bar',
        component: BarGraphComponent,
      },
      {
        path: 'pie',
        component: PieChartComponent,
      },
      {
        path: 'line',
        component: LineChartComponent,
      },
      {
        path: 'counter',
        component: CounterOutputComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
