import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IgraphData } from 'src/app/core/models/graph.model';
import * as d3 from 'd3';
import { GraphDataService } from 'src/app/core/services/graph-data.service';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BarGraphComponent implements OnInit {
  loader: boolean = true;
  data: IgraphData[] = [];

  margin = 50;
  chart_width = 400;
  chart_height = 400 - this.margin * 2;

  constructor(private graphService: GraphDataService) {}

  ngOnInit(): void {
    this.graphService.getData().subscribe((data) => {
      this.loader = false;
      this.data = data;
      console.log(this.data);
      this.createChart();
    });
  }

  createChart() {
    const x: any = d3
      .scaleBand()
      .rangeRound([0, this.chart_width])
      .padding(0.1);

    const y = d3.scaleLinear().range([this.chart_height, 0]);

    const chartContainer = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.chart_width + this.margin * 2)
      .attr('height', this.chart_height + this.margin * 2)
      .append('g')
      .attr('transform', `translate(${this.margin}, ${this.margin})`);

    x.domain(this.data.map((d) => d.name));

    y.domain([0, d3.max(this.data, (data: any) => data.score)]);

    const chart = chartContainer.append('g');

    chart
      .selectAll('.bar')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('width', x.bandwidth)
      .attr('height', (data) => this.chart_height - y(data.score))
      .attr('x', (data) => x(data.name))
      .attr('y', (data) => y(data.score))
      .classed('bar', true);

    chart
      .selectAll('.label')
      .data(this.data)
      .enter()
      .append('text')
      .text((data) => data.score)
      .attr('x', (data) => x(data.name) + x.bandwidth() / 2)
      .attr('y', (data) => y(data.score) - 20)
      .attr('text-anchor', 'middle')
      .classed('label', true);

    chart
      .append('g')
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .attr('transform', `translate(0, ${this.chart_height + 10})`)
      .attr('color', '#5695bf');
  }
}
