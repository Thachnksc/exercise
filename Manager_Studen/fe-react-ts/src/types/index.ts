export interface Student {
    userId: string;
    userName: string;
    roleName: string;
    scores: number[];
}

export interface Stats {
    totalStudentsHaveScore: number;
    totalScore: number;
    highestScore: number;
    lowestScore: number;
    averageScore: number;
}

export interface ScoreResponse {
    userId: string;
    userName: string;
    roleName: string;
    scores: number[];
}
