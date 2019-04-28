export class GraphResponse {
  graph: {
    nodes: {
      nodeId: string;
      weight: number;
      color: string;
    }[],
    edges: {
      nodeId1: string;
      nodeId2: string;
      weight: number;
      color: string
    }[]
  };

  time: number;

  constructor(graph: { nodes: { nodeId: string; weight: number; color: string }[]; edges: { nodeId1: string; nodeId2: string; weight: number; color: string }[] }, time: number) {
    this.graph = graph;
    this.time = time;
  }
}
