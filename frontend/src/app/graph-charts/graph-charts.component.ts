import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph-charts',
  templateUrl: './graph-charts.component.html',
  styleUrls: ['./graph-charts.component.scss']
})
export class GraphChartsComponent implements OnInit {

  @Input()
  title: string;
  type = 'Histogram';

  @Input()
  data = [];

  @Input()
  columnNames: string[];
  options = {
    legend: 'none'
  };
  width = 550;
  height = 400;

  @Input()
  average: number;

  constructor() {
  }

  ngOnInit() {
  }

}
