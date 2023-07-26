import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IgraphData } from 'src/app/core/models/graph.model';
import * as d3 from 'd3';
import { GraphDataService } from 'src/app/core/services/graph-data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  data: IgraphData[] = [];
  loader: boolean = true;
  private margin = 50;
  private width = 400;
  private height = 400;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;

  constructor(private graphService: GraphDataService) {}

  ngOnInit(): void {
    this.graphService.getData().subscribe((d) => {
      this.loader = false;
      this.data = d;
      console.log(this.data);
      this.createPieChart();
    });
  }

  createPieChart() {
    const colorScale = d3.scaleOrdinal([
      '#2085ec',
      '#72b4eb',
      '#0a417a',
      '#8464a0',
      '#cea9bc',
    ]);

    const chartContainer = d3
      .select('figure#pieChart')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const pie = d3.pie<IgraphData>().value((d) => d.score);
    const arc: any = d3
      .arc()
      .outerRadius(this.radius)
      .innerRadius(0)
      .cornerRadius(5);
    const hoverArc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(this.radius * 1.1);

    const chart = chartContainer
      .selectAll('.arc')
      .data(pie(this.data))
      .enter()
      .append('g');

    chart
      .append('path')
      .attr('d', arc)
      .attr('fill', (d: any, i: any) => colorScale(i))
      .attr('fill-opacity', 0.8)
      .attr('stroke', '#11141C')
      .attr('stroke-width', '2');

    const labelLocation: any = d3.arc().innerRadius(0).outerRadius(this.radius);

    chart
      .append('text')
      .attr(
        'transform',
        (d: any) => `translate(${labelLocation.centroid(d) + this.radius})`
      )
      .attr('text-anchor', 'middle')
      .text((d) => `${d.data.name} - ${Math.round((d.data.score * 100) / 37)}%`)
      .attr('font-size', 14)
      .attr('font-weight', 800)
      .attr('fill', '#FFF')
      .attr('text-shadow', '2px 2px #0E0B16');

    // chartContainer
    //   .selectAll('pieces')
    //   .data(pie(this.data))
    //   .enter()
    //   .append('text')
    //   .text((d: any) => d.data.score)
    //   // .text((d: any) => d.data.name)
    //   .attr(
    //     'transform',
    //     (d: any) => 'translate(' + labelLocation.centroid(d) + ')'
    //   )
    //   .style('text-anchor', 'middle')
    //   .style('font-size', 15);
    // this.createLegends();
  }

  createLegends() {
    const colorScale = d3.scaleOrdinal([
      '#2085ec',
      '#72b4eb',
      '#0a417a',
      '#8464a0',
      '#cea9bc',
    ]);
    const legends = d3
      .select('svg')
      .append('g')
      .attr('transform', 'translate(500, 300)')
      .selectAll('.legends')
      .data(this.data);

    const legend = legends
      .enter()
      .append('g')
      .classed('legends', true)
      .attr('transform', (d, i) => `translate(0,${i + 1 * 30})`);

    legend
      .append('rect')
      .attr('width', 20)
      .attr('height', 20)
      .attr('fill', (d: any, i: any) => colorScale(i));

    legend.append('text');
  }
}
