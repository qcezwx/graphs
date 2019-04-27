import {Injectable} from '@angular/core';
import {GraphData} from "./graph-data.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {GraphResponse} from "./GraphResponse";

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

  getRandomGraph(): GraphData {
    let graphData: GraphData = {nodes: [], links: []};

    for (let i = 0; i < 3; i++) {
      graphData.nodes[i] = {
        id: i,
        group: 1,
        weight: Math.floor(Math.random() * 10 + 5)
      };
    }

    let linkCounter = 0;
    for (let i = 0; i < graphData.nodes.length; i++) {
      for (let j = i + 1; j < graphData.nodes.length; j++) {
        graphData.links[linkCounter++] = {
          source: i,
          target: j,
          weight: Math.floor(Math.random() * 4 + 1)
        };
      }
    }

    return graphData;
  }

  getResultGraph(): Observable<GraphResponse> {
    return this.http.get<GraphResponse>(`http://localhost:8080/api/sasha/result-graph`)
  }

}
