import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-new-game-dialog',
  templateUrl: './new-game-dialog.component.html',
  styleUrls: ['./new-game-dialog.component.css']
})
export class NewGameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {name: string, winner_condition: boolean}, public dialogRef: MatDialogRef<NewGameDialogComponent>) { }

  ngOnInit(): void {
  }

  onNewGameClick(): void {
    console.log('start new game pressed')
    this.dialogRef.close(true);
  }

}
