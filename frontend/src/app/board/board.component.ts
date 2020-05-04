import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { CanvasWhiteboardUpdate, CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
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
  drawnUUIDs = [];
  sendUpdates: CanvasWhiteboardUpdate[] = [];

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
      // console.log(updates)
      let board = new Board()
      board.canvasWhiteboardUpdates = updates
      this.boardService.save(board).subscribe()
      console.log(this.canvasWhiteboard.getDrawingHistory())
    }

  onCanvasClear() {
    // this.canvasWhiteboard.clearCanvasLocal()  
    this.boardService.delete(this.currentBoard.id).subscribe(data => {
      console.log("database was emptied.")
    })
    this.sendUpdates = []
    this.currentBoard = new Board()
      console.log("The canvas was cleared");
  }

  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }

  onCanvasRedo(updateUUID: string) {
    
    console.log(`REDO with uuid: ${updateUUID}`);
  }

  drawDatabaseUpdates() {
    // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 0, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape")]);
    // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 2, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape")]);
    // first check if mouse is being used
    // if (!this.canvasWhiteboard.drawingEnabled) {
      console.log("refreshing from db!");
      this.boardService.find(this.currentBoard.id).subscribe(data => {
        if (data != null) {
          console.log("refreshing from db! [data != null]");
          // now check if updates dont contain undefined
          // this.currentBoard = data
          if (data.canvasWhiteboardUpdates != null) {
            var allCorrect: boolean = true;
            var endIndexes: number[] = [0];
            data.canvasWhiteboardUpdates.forEach((element, index) => {
              if (element == undefined || element == null) {
                allCorrect = false;
              } else if (element.type == 2 || element.type == 1) {
                endIndexes.push(index);
              }
            });
            if (allCorrect) {
              console.log("refreshing from db! [allCorrect]");
              console.log(this.canvasWhiteboard.getDrawingHistory())
              var sendUpdates: CanvasWhiteboardUpdate[] = []
              var newUUIDs = []
              var finishedUpdatesSlice: CanvasWhiteboardUpdate[] = data.canvasWhiteboardUpdates.slice(0, endIndexes[endIndexes.length-1])
              // add only if not drawn yet.
              finishedUpdatesSlice.forEach(childUpdate => {
                if (!this.canvasWhiteboard.getDrawingHistory().some((parentUpdate) => (
                  
                  childUpdate.UUID == parentUpdate.UUID  &&
                  childUpdate.x == parentUpdate.x &&
                  childUpdate.y == parentUpdate.y &&
                  childUpdate.selectedShape == parentUpdate.selectedShape &&
                  childUpdate.type == parentUpdate.type                
                  ))) {
                  sendUpdates.push(childUpdate)
                  console.log(childUpdate.stringify)
                }
              })

              if (sendUpdates.length > 0) {
                console.log("new!")
                this.sendUpdates = sendUpdates
              } else {
                this.sendUpdates = []
                console.log("nothing new!")
              }
            }
          }
        }
    })    
    // }
  }

  ngOnInit(): void {
    // history not registered with foreign drawUpdates?...
    setInterval(() => {
      console.log("interval")
      console.log(console.log(this.canvasWhiteboard.getDrawingHistory()))
      this.drawDatabaseUpdates();
      // this.canvasWhiteboard.clearCanvas()
      this.canvasWhiteboard.drawUpdates(this.sendUpdates)
    }, 5000);
  }

  ngOnDestroy() {
  }

}
