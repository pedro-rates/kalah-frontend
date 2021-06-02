export interface Game {
    gameId: string;
    chosenPit: number;
    pits: Array<number>;
    gameStatus: string;
    winner: string;
    turn: string;
}