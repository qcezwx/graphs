import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {GraphData} from "../graph/graph-data.model";
import {GraphService} from "../graph/graph.service";
import {GraphResponse} from "../graph/GraphResponse";
import {GraphRequest} from "../graph/GraphRequest";
import {RankingResponse} from "../graph/RankingResponse";
import {RankingRequest} from "../graph/RankingRequest";
import {RankingResponseV2} from "../graph/RankingResponseV2";


@Component({
  selector: 'data-container',
  templateUrl: './graph-data-container.component.html',
  styleUrls: ['./graph-data-container.component.scss']
})
export class GraphDataContainerComponent implements OnInit, OnDestroy {
  initialGraphData: GraphData = {nodes: [], links: []};
  resultGraphData: GraphData;
  time: number;
  score: number;

  graphResponse: GraphResponse;
  rankingResponse: RankingResponse;
  rankingResponseV2 : RankingResponseV2;

  timeRankings: [];
  timeAverage: number;
  timeAxis = ["ms", "amount"];
  scoreRankings: [];
  scoreAverage: number;
  scoreAxis = ["score", "amount"];

  nodesNumber: number;
  nodeMinWeight: number;
  nodeMaxWeight: number;
  linkMinWeight: number;
  linkMaxWeight: number;
  limit: number;
  iterations: number;
  methods = [
    {value: 'simple_greedy', viewValue: 'Simple Greedy'},
    {value: 'spath_greedy', viewValue: 'Spath Greedy'},
    {value: 'simple_grasp', viewValue: 'Simple Grasp'},
    {value: 'spath_grasp', viewValue: 'Spath Grasp'}
  ];
  selectedMethod: string;

  @Input()
  rankingsMode;

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.initialGraphData = this.graphService.getRandomGraph(10, 5, 10, 1, 4);
  }

  updateResultGraphData(): void {
    console.log(performance.now());
    let graphRequest: GraphRequest = new GraphRequest({nodes: [], links: []}, {name: "test", params:{limit: 0}});

    for (let i = 0; i < this.initialGraphData.nodes.length; i++) {
      graphRequest.graph.nodes.push({
        nodeId: this.initialGraphData.nodes[i].id,
        weight: this.initialGraphData.nodes[i].weight
      });
    }

    for (let i = 0; i < this.initialGraphData.links.length; i++) {
      graphRequest.graph.links.push({
        nodeId1: this.initialGraphData.links[i].source.id,
        nodeId2: this.initialGraphData.links[i].target.id,
        weight: this.initialGraphData.links[i].weight
      });
    }

    graphRequest.method = {
      name: this.selectedMethod,
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
          group: i === 0 ? 4 : (this.graphResponse.graph.nodes[i].color === "green" ? 1 : 2),
          weight: this.graphResponse.graph.nodes[i].weight
        });
      }

      for (let i = 0; i < this.graphResponse.graph.links.length; i++) {
        result.links.push({
          source: this.graphResponse.graph.links[i].nodeId1,
          target: this.graphResponse.graph.links[i].nodeId2,
          group: this.graphResponse.graph.links[i].color === "blue" ? 1 : 2,
          weight: this.graphResponse.graph.links[i].weight
        });
      }

      this.resultGraphData = result;

      if (graphResponse.time) {
        this.time = graphResponse.time;
      }

      if (graphResponse.score) {
        this.score = graphResponse.score;
      }
    });

  }

  getRankings(): void {
    let rankingRequest: RankingRequest =
      new RankingRequest(this.nodesNumber,
        this.nodeMinWeight,
        this.nodeMaxWeight,
        this.linkMinWeight,
        this.linkMaxWeight,
        {name: this.selectedMethod, params: {limit: this.limit, iterations: this.iterations}});

    this.graphService.getRankings(rankingRequest).subscribe((rankingsResponse: RankingResponse) => {
      this.rankingResponse = rankingsResponse;
    });
  }

  getRankingsV2(): void {
    let rankingRequest: RankingRequest =
      new RankingRequest(this.nodesNumber,
        this.nodeMinWeight,
        this.nodeMaxWeight,
        this.linkMinWeight,
        this.linkMaxWeight,
        {name: this.selectedMethod, params: {limit: this.limit, iterations: this.iterations}});

    this.graphService.getRankingsV2(rankingRequest).subscribe((rankingsResponse: RankingResponseV2) => {
      this.rankingResponseV2 = rankingsResponse;

      this.getTimesFromRankingResponseV2();
      this.getScoreFromRankingResponseV2();
      console.log(rankingsResponse);
    });
  }

  getTimesFromRankingResponseV2(): void {
    let times = [];
    let sum = 0;
    for (let i = 0; i < this.rankingResponseV2.timeRanking.length; i++) {
      let time = Math.round(this.rankingResponseV2.timeRanking[i] * 1000);
      sum += time;
      times.push([i.toString(), time])
    }

    this.timeAverage = Math.round(sum/this.rankingResponseV2.timeRanking.length);
    this.timeRankings = times;
  }

  getScoreFromRankingResponseV2(): void {
    let scores = [];
    let sum = 0;
    for (let i = 0; i < this.rankingResponseV2.scoreRanking.length; i++) {
      sum += this.rankingResponseV2.scoreRanking[i];
      scores.push([i.toString(), Math.round(this.rankingResponseV2.scoreRanking[i])])
    }

    this.scoreAverage = Math.round(sum/this.rankingResponseV2.scoreRanking.length)
    this.scoreRankings = scores;
  }

  graphDataChangedHandler(graphData: GraphData) {
    this.initialGraphData = graphData;
  }

  ngOnDestroy(): void {
  }
}
