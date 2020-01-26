import {Injectable} from '@angular/core';
import {GraphData} from "./graph-data.model";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {GraphResponse} from "./GraphResponse";
import {GraphRequest} from "./GraphRequest";
import {RankingResponse} from "./RankingResponse";
import {RankingRequest} from "./RankingRequest";
import {Graph} from "./Graph";
import {RankingResponseV2} from "./RankingResponseV2";
import {GatewayService} from "../gateway.service";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient, private gatewayService: GatewayService) {
  }

  getConfig() {
    return this.http.get(this.configUrl);
  }

  getRandomGraph(nodesNumber: number, nodeMinWeight: number, nodeMaxWeight: number, linkMinWeight: number, linkMaxWeight: number): GraphData {
    let graphData: GraphData = {nodes: [], links: []};

    for (let i = 0; i < nodesNumber; i++) {
      graphData.nodes[i] = {
        id: i,
        group: 3,
        weight: Math.floor(Math.random() * (nodeMaxWeight - nodeMinWeight + 1)) + nodeMinWeight
      };
    }

    let linkCounter = 0;
    for (let i = 0; i < graphData.nodes.length; i++) {
      for (let j = i + 1; j < graphData.nodes.length; j++) {
        graphData.links[linkCounter++] = {
          source: i,
          target: j,
          group: 3,
          weight: Math.floor(Math.random() * (linkMaxWeight - linkMinWeight + 1)) + linkMinWeight
        };
      }
    }

    return graphData;
  }

  getGraphFromFile(request: FormData): Observable<Graph> {
    let params = new HttpParams();

    const options = {
      params: params,
      reportProgress: true,
    };

    return this.http.post<Graph>(`${this.gatewayService.gateway}/api/read-from-file`, request, options);
  }

  getResultGraph(request: GraphRequest): Observable<GraphResponse> {
    return this.http.post<GraphResponse>(`${this.gatewayService.gateway}/api/sasha/result-graph`, request);
  }

  getRankings(request: RankingRequest): Observable<RankingResponse> {
    return this.http.post<RankingResponse>(`${this.gatewayService.gateway}/api/sasha/rankings`, request);
  }

  getRankingsV2(request: RankingRequest): Observable<RankingResponseV2> {
    return this.http.post<RankingResponseV2>(`${this.gatewayService.gateway}/api/sasha/rankingsV2`, request);
  }

}
