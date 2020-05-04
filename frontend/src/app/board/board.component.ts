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

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    console.log(updates)
      let board = new Board()
      board.canvasWhiteboardUpdates = updates
      this.boardService.save(board).subscribe()
      }

  onCanvasClear() {
      this.boardService.delete(this.currentBoard.id).subscribe(data => {
        console.log("database was emptied.")
      })
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
    if (!this.canvasWhiteboard.drawingEnabled) {
      console.log("refreshing from db!");
      this.boardService.find(this.currentBoard.id).subscribe(data => {
        this.canvasWhiteboard.clearCanvas()
        if (data != null) {
          console.log("refreshing from db! [data != null]");
          // now check if updates dont contain undefined
          this.currentBoard = data
          if (this.currentBoard.canvasWhiteboardUpdates != null) {
            var allCorrect: boolean = true;
            var endIndexes: number[] = [0];
            this.currentBoard.canvasWhiteboardUpdates.forEach((element, index) => {
              if (element == undefined || element == null) {
                allCorrect = false;
              } else if (element.type == 2 || element.type == 1) {
                endIndexes.push(index);
              }
            });
            if (allCorrect) {
              console.log("refreshing from db! [allCorrect]");
              var sendUpdates: CanvasWhiteboardUpdate[] = []
              var newUUIDs = []
              this.currentBoard.canvasWhiteboardUpdates.slice(0, endIndexes[endIndexes.length-1]).forEach((element, index) => {
                if (!(element.UUID in this.drawnUUIDs)) {
                  sendUpdates.push(element)
                  newUUIDs.push(element.UUID)
                }
              });
              this.drawnUUIDs.push(...newUUIDs)

              if (sendUpdates.length > 0) {
                // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 0, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape")]);
                // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 2, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape")]);
                this.canvasWhiteboard.drawUpdates(sendUpdates)
              } else {
                console.log("database empty!")
              }
            }
          }
        }
      })
    }
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.drawDatabaseUpdates();
    // }, 2000);)
  }

  ngOnDestroy() {
  }

}
