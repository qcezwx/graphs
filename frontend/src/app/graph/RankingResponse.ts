export class RankingResponse {
  minTime: number;
  maxTime: number;
  averageTime: number;
  minScore: number;
  maxScore: number;
  averageScore: number;

  constructor(minTime: number, maxTime: number, averageTime: number, minScore: number, maxScore: number, averageScore: number) {
    this.minTime = minTime;
    this.maxTime = maxTime;
    this.averageTime = averageTime;
    this.minScore = minScore;
    this.maxScore = maxScore;
    this.averageScore = averageScore;
  }
}
