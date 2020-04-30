import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
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
export class BoardComponent implements OnInit, OnDestroy {
 
  constructor(public boardService: BoardService) { 
  }

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  currentBoard: Board = new Board;
  drawing: boolean = false;
  deleting: boolean = false;
  dbupdating: boolean = false;
  lastUpdate: CanvasWhiteboardUpdate;

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    if (!this.dbupdating) {
      this.drawing = true
      let board = new Board()
      board.canvasWhiteboardUpdates = updates
      console.log(board)
      this.currentBoard = board
      this.lastUpdate = updates[updates.length - 1]
      this.boardService.save(board).subscribe(data => {
        if (this.lastUpdate.type == 2) {
          console.log("drawing stopped!")
          this.drawing = false
        }
      })
      
      
    }
  }

  onCanvasClear() {
    if (!this.dbupdating) {
      this.deleting = true
      this.boardService.delete(this.currentBoard.id).subscribe(data => { 
        this.canvasWhiteboard.context.clearRect(0,0,this.canvasWhiteboard.context.canvas.width, this.canvasWhiteboard.context.canvas.height)
        // this.canvasWhiteboard.context.restore()
        this.deleting = false})
      console.log("The canvas was cleared");
    }
    
  }

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }

  onCanvasRedo(updateUUID: string) {
    console.log(`REDO with uuid: ${updateUUID}`);
  }

  drawDatabaseUpdates() {
    // first check if mouse is being used
    if (!this.drawing && !this.deleting) {
      this.dbupdating = true

      console.log("refreshing from db!");
    
      this.boardService.find(this.currentBoard.id).subscribe(data => 
        {
          this.currentBoard = data
          this.canvasWhiteboard.clearCanvas()
          if (this.currentBoard.canvasWhiteboardUpdates) {
            this.canvasWhiteboard.context.restore()
            this.canvasWhiteboard.drawUpdates(this.currentBoard.canvasWhiteboardUpdates)
          }
        this.dbupdating = false
        })
    }
  }

  ngOnInit(): void {
    setInterval(() => {
      this.drawDatabaseUpdates();
    }, 1000);
  }

  ngOnDestroy() {
  }

}
