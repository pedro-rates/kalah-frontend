import { Injectable } from '@angular/core';
import { Game } from './game';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private kalahGameUrl = environment.backendUrl;

  constructor(
    private http: HttpClient) { }

  getGame(): Observable<Game> {
    const newGame: Game = {
      gameId: '',
      chosenPit: 0,
      pits: [],
      gameStatus: '',
      winner: '',
      turn: ''
    }
    return this.http.post<Game>(this.kalahGameUrl, newGame);
  }

  makeMove(game: Game): Observable<Game> {
    return this.http.post<Game>(this.kalahGameUrl, game);
  }
}
