import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from '../game';
import { GameService } from '../game.service';
import { NewGameDialogComponent } from '../new-game-dialog/new-game-dialog.component';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game = {
    gameId: '---',
    chosenPit: 0,
    pits: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    gameStatus: '---',
    winner: '',
    turn: '---'
  }

  loading: boolean = false;

  constructor(private gameService: GameService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getGame(): void {
    this.loading = true;
    this.gameService.getGame()
      .subscribe(game => { 
        this.game = game
        this.loading = false;
      });
  }

  onSelect(index: number): void {
    if(this.game.gameStatus === 'FINISHED') return;
    console.log(index);
    console.log("seeds in pit:" + this.game.pits[index]);
    this.game.chosenPit = index;
    this.loading = true;
    this.gameService.makeMove(this.game).subscribe(game => {
      this.game = game;
      this.loading = false;
      this.checksForGameOver(game);
    });
  
  }

  checksForGameOver(game: Game): void {
    console.log('checking for game over ' + game.gameStatus);
    console.log('winner:' + game.winner);
    let dialogRef;
    if(game.gameStatus === 'FINISHED') {
      dialogRef = this.dialog.open(NewGameDialogComponent, {
        data: {
          name: this.game.winner,
          winner_condition: this.game.winner !== 'DRAW'
        },
        height: '400px',
        width: '600px'
      })
      dialogRef.afterClosed().subscribe(result => {
        if(result === true) {
          this.getGame();
        } else {
          console.log('clicked elsewhere')
        }
      })
    }
  }

  isGameRunning(): boolean {
    if(this.game.gameStatus === 'RUNNING' || this.game.gameStatus === 'INVALID') {
      return true;
    } 
    return false;
  }

}
