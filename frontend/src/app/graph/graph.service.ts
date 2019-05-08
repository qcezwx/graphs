import {Injectable} from '@angular/core';
import {GraphData} from "./graph-data.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {GraphResponse} from "./GraphResponse";
import {GraphRequest} from "./GraphRequest";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  configUrl = 'assets/config.json';

  constructor(private http: HttpClient) {
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

  getResultGraph(request: GraphRequest): Observable<GraphResponse> {
    return this.http.post<GraphResponse>(`http://localhost:8080/api/sasha/result-graph`, request);
  }

}
