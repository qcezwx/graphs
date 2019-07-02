import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";
import {GraphService} from "../graph/graph.service";

@Component({
  selector: 'app-graph-input-random',
  templateUrl: './graph-input-random.component.html',
  styleUrls: ['./graph-input-random.component.scss']
})
export class GraphInputRandomComponent implements OnInit {
  nodesNumber: number;
  nodeMinWeight: number;
  nodeMaxWeight: number;
  linkMinWeight: number;
  linkMaxWeight: number;

  @Output()
  graphDataChanged: EventEmitter<GraphData> = new EventEmitter();

  constructor(private graphService: GraphService) { }

  getRandomGraph(): void {
    this.graphDataChanged.emit(
      this.graphService.getRandomGraph(this.nodesNumber, this.nodeMinWeight, this.nodeMaxWeight, this.linkMinWeight, this.linkMaxWeight));
  }

  ngOnInit() {
  }

}
