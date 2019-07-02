export class Graph {
  nodes: {
    nodeId: string;
    weight: number;
  }[];

  links: {
    nodeId1: string;
    nodeId2: string;
    weight: number;
  }[];

  constructor(nodes: { nodeId: string; weight: number }[], links: { nodeId1: string; nodeId2: string; weight: number }[]) {
    this.nodes = nodes;
    this.links = links;
  }
}
