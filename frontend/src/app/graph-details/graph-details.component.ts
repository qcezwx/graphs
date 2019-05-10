import {Component, Input, OnInit} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";

@Component({
  selector: 'app-graph-details',
  templateUrl: './graph-details.component.html',
  styleUrls: ['./graph-details.component.scss']
})
export class GraphDetailsComponent implements OnInit {

  @Input()
  graphData: GraphData;
  panelOpenState = false;

  nodeDataSource: NodeData[] = [];
  linkDataSource: LinkData[] = [];

  nodeColumns: string[] = ['id', 'weight', 'isIncluded'];
  linkColumns: string[] = ['source', 'target', 'weight', 'isIncluded']

  constructor() {
  }

  ngOnInit() {
    for (let i = 0; i < this.graphData.nodes.length; i++) {
      this.nodeDataSource.push({
        id: this.graphData.nodes[i].id,
        weight: this.graphData.nodes[i].weight,
        isIncluded: this.graphData.nodes[i].group === 1
      });
    }

    for (let i = 0; i < this.graphData.links.length; i++) {
      this.linkDataSource.push({
        source: this.graphData.links[i].source,
        target: this.graphData.links[i].target,
        weight: this.graphData.links[i].weight,
        isIncluded: this.graphData.links[i].group === 1
      });
    }
  }
}

export interface NodeData {
  id: string;
  weight: number;
  isIncluded: boolean;
}

export interface LinkData {
  source: string;
  target: string;
  weight: number;
  isIncluded: boolean;
}
