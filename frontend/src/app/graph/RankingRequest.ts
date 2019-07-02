export class RankingRequest {
  nodesNumber: number;
  nodeMinWeight: number;
  nodeMaxWeight: number;
  linkMinWeight: number;
  linkMaxWeight: number;

  method: {
    name?: string;
    params: {
      limit?: number;
      iterations?: number;
    }
  };

  constructor(nodesNumber: number, nodeMinWeight: number, nodeMaxWeight: number, linkMinWeight: number, linkMaxWeight: number, method: { name?: string; params: { limit?: number; iterations?: number } }) {
    this.nodesNumber = nodesNumber;
    this.nodeMinWeight = nodeMinWeight;
    this.nodeMaxWeight = nodeMaxWeight;
    this.linkMinWeight = linkMinWeight;
    this.linkMaxWeight = linkMaxWeight;
    this.method = method;
  }
}
