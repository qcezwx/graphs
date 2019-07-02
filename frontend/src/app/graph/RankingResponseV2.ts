export class RankingResponseV2 {
  timeRanking: number[];
  scoreRanking: number[];

  constructor(timeRanking: number[], scoreRanking: number[]) {
    this.timeRanking = timeRanking;
    this.scoreRanking = scoreRanking;
  }
}
