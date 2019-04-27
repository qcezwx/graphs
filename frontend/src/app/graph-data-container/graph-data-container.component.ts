import {Component, OnDestroy, OnInit} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";
import {GraphService} from "../graph/graph.service";
import {GraphResponse} from "../graph/GraphResponse";

@Component({
  selector: 'data-container',
  templateUrl: './graph-data-container.component.html',
  styleUrls: ['./graph-data-container.component.scss']
})
export class GraphDataContainerComponent implements OnInit, OnDestroy {
  initialGraphData: GraphData = {nodes: [], links: []};
  resultGraphData: GraphData = {nodes: [], links: []};
  time: number;

  graphResponse: GraphResponse;

  private sub: any;

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.initialGraphData = this.graphService.getRandomGraph();
  }

  updateResultGraphData(): void {
    this.graphService.getResultGraph().subscribe(graphResponse => this.graphResponse = graphResponse);

    for (let i = 0; i < this.graphResponse.graph.nodes.length; i++) {
      this.resultGraphData.nodes[i] = {
        id: this.graphResponse.graph.nodes[i].nodeId,
        group: this.graphResponse.graph.nodes[i].color == "green" ? 1 : 2,
        weight: this.graphResponse.graph.nodes[i].weight
      }
    }

    for (let i = 0; i < this.graphResponse.graph.links.length; i++) {
      this.resultGraphData.links[i] = {
        source: this.graphResponse.graph.links[i].nodeId1,
        target: this.graphResponse.graph.links[i].nodeId2,
        weight: this.graphResponse.graph.links[i].weight
      }
    }

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
