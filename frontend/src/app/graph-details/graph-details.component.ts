import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";
import {PropertyHandler} from "../util/property-handler";

@Component({
  selector: 'app-graph-details',
  templateUrl: './graph-details.component.html',
  styleUrls: ['./graph-details.component.scss'],
})
export class GraphDetailsComponent implements OnChanges {

  @Input()
  graphData: GraphData;
  panelOpenState = false;

  nodeDataSource: NodeData[] = [];
  linkDataSource: LinkData[] = [];

  nodeColumns: string[] = ['id', 'weight', 'isIncluded'];
  linkColumns: string[] = ['source', 'target', 'weight', 'isIncluded'];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.prepareTableView()
  }

  private prepareTableView() {
    this.nodeDataSource = [];
    this.linkDataSource = [];

    for (let i = 0; i < this.graphData.nodes.length; i++) {
      this.nodeDataSource.push({
        id: this.graphData.nodes[i].id,
        weight: this.graphData.nodes[i].weight,
        isIncluded: this.graphData.nodes[i].group === 1 || this.graphData.nodes[i].group === 4
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
