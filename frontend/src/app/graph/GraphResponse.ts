export class GraphResponse {
  graph: {
    nodes: {
      nodeId: string;
      weight: number;
      color: string;
    }[],
    links: {
      nodeId1: string;
      nodeId2: string;
      weight: number;
      color: string
    }[]
  };

  time?: number;
  score?: number;

  constructor(graph: { nodes: { nodeId: string; weight: number; color: string }[]; links: { nodeId1: string; nodeId2: string; weight: number; color: string }[] }, time: number, score: number) {
    this.graph = graph;
    this.time = time;
    this.score = score
  }
}
