import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { CanvasWhiteboardUpdate } from 'ng2-canvas-whiteboard';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { BoardService } from '../board.service';
import { Board } from '../board';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit {
  constructor(public boardService: BoardService) { }

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  currentBoard: Board = new Board;

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    let board = new Board()
    board.canvasWhiteboardUpdates = updates
    console.log(board)
    this.currentBoard = board
    this.boardService.save(board).subscribe()
  }

  onCanvasClear() {
    this.boardService.delete(this.currentBoard.id).subscribe()
    console.log("The canvas was cleared");
  }

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }

  onCanvasRedo(updateUUID: string) {
    console.log(`REDO with uuid: ${updateUUID}`);
  }

  yay() {
    console.log("test");
    this.boardService.find(this.currentBoard.id).subscribe(data => 
      {
        this.currentBoard = data
        this.canvasWhiteboard.clearCanvas()
        this.canvasWhiteboard.drawUpdates(this.currentBoard.canvasWhiteboardUpdates)
      })
  }

  ngOnInit(): void {
  }

}
