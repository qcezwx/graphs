import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";
import {GraphService} from "../graph/graph.service";
import {GraphResponse} from "../graph/GraphResponse";
import {GraphRequest} from "../graph/GraphRequest";


@Component({
  selector: 'data-container',
  templateUrl: './graph-data-container.component.html',
  styleUrls: ['./graph-data-container.component.scss']
})
export class GraphDataContainerComponent implements OnInit, OnDestroy {
  initialGraphData: GraphData = {nodes: [], links: []};
  resultGraphData: GraphData;
  time: number;

  graphResponse: GraphResponse;

  nodesNumber: number;
  nodeMinWeight: number;
  nodeMaxWeight: number;
  linkMinWeight: number;
  linkMaxWeight: number;
  limit: number;

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.initialGraphData = this.graphService.getRandomGraph(5, 5, 10, 1, 4);
  }

  getRandomGraph(): void {
    this.initialGraphData = this.graphService.getRandomGraph(this.nodesNumber, this.nodeMinWeight, this.nodeMaxWeight, this.linkMinWeight, this.linkMaxWeight);
  }

  updateResultGraphData(): void {
    let graphRequest: GraphRequest = new GraphRequest({nodes: [], edges: []}, {name: "test", params:{limit: 0}});

    for (let i = 0; i < this.initialGraphData.nodes.length; i++) {
      graphRequest.graph.nodes.push({
        nodeId: this.initialGraphData.nodes[i].id,
        weight: this.initialGraphData.nodes[i].weight
      });
    }

    for (let i = 0; i < this.initialGraphData.links.length; i++) {
      graphRequest.graph.edges.push({
        nodeId1: this.initialGraphData.links[i].source.id,
        nodeId2: this.initialGraphData.links[i].target.id,
        weight: this.initialGraphData.links[i].weight
      });
    }

    graphRequest.method = {
      name: "simple_grasp",
      params: {
        limit: this.limit
      }
    };

    this.graphService.getResultGraph(graphRequest).subscribe((graphResponse: GraphResponse) => {
      this.graphResponse = graphResponse;
      let result: GraphData = {nodes: [], links: []};

      for (let i = 0; i < this.graphResponse.graph.nodes.length; i++) {
        result.nodes.push({
          id: this.graphResponse.graph.nodes[i].nodeId,
          group: this.graphResponse.graph.nodes[i].color === "green" ? 1 : 2,
          weight: this.graphResponse.graph.nodes[i].weight
        });
      }

      for (let i = 0; i < this.graphResponse.graph.edges.length; i++) {
        result.links.push({
          source: this.graphResponse.graph.edges[i].nodeId1,
          target: this.graphResponse.graph.edges[i].nodeId2,
          group: this.graphResponse.graph.edges[i].color === "blue" ? 1 : 2,
          weight: this.graphResponse.graph.edges[i].weight
        });
      }

      this.resultGraphData = result;
      console.log(this.resultGraphData)
    });
  }

  ngOnDestroy(): void {
  }
}
