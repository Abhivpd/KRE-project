import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { IgraphData } from 'src/app/core/models/graph.model';
import { GraphDataService } from 'src/app/core/services/graph-data.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  loader: boolean = true;
  data: IgraphData[] = [];
  constructor(
    private http: HttpClient,
    private graphService: GraphDataService
  ) {}

  ngOnInit(): void {
    this.graphService.getData().subscribe((data) => {
      this.loader = false;
      this.data = data;
      this.createChart(this.data);
    });
  }

  createChart(data: any) {
    const margin = 50;
    const width = 400 - margin * 2;
    const height = 400 - margin * 2;

    const chartContainer = d3
      .select('#lineGraph')
      .append('svg')
      .attr('width', width + margin * 2)
      .attr('height', height + margin * 2)
      .append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const x = d3.scaleLinear().domain([0, 10]).rangeRound([0, width]);

    chartContainer
      .append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(x));

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(this.data, (data: any): any => data.score) + 1])
      .range([height, 0]);

    chartContainer.append('g').call(d3.axisLeft(y));

    const lines = d3
      .line()
      .x((d: any) => x(d.id))
      .y((d: any) => y(d.score));

    chartContainer
      .append('path')
      .datum(data)
      .attr('d', lines(data))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5);
    console.log();

    chartContainer
      .selectAll('label')
      .data(this.data)
      .enter()
      .append('text')
      .text((d: any) => d.name)
      .attr('x', (d: any) => x(d.id))
      .attr('y', (d: any) => y(d.score) - 10)
      .attr('text-anchor', 'middle');
  }
}
