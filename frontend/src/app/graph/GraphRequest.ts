export class GraphRequest {
  graph: {
    nodes: {
      nodeId: string;
      weight: number;
    }[],
    links: {
      nodeId1: string;
      nodeId2: string;
      weight: number;
    }[]
  };

  method: {
    name?: string;
    params: {
      limit: number;
    }
  };

  constructor(graph: { nodes: { nodeId: string; weight: number }[]; links: { nodeId1: string; nodeId2: string; weight: number }[] },
              method: { name: string; params: { limit: number } }) {
    this.graph = graph;
    this.method = method;
  }
}
