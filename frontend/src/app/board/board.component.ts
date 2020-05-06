import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { CanvasWhiteboardUpdate, CanvasWhiteboardModule, CanvasWhiteboardShapeOptions } from 'ng2-canvas-whiteboard';
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
  drawnUpdates = [];
  sendUpdates: CanvasWhiteboardUpdate[] = [];
  databaseEmptied: boolean = false;
  drawing: boolean = false;
  deleting: boolean = false;
  databaseUpdating: boolean = false;

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    if (!this.databaseUpdating) {
      this.drawing = true;
        let board = new Board();
        board.canvasWhiteboardUpdates = updates;
      this.boardService.save(board).subscribe(data => {
        var lastUpdate = updates[updates.length - 1];
        if (lastUpdate.type == 2) {
          this.drawing = false;
        }
      })
      console.log(this.canvasWhiteboard.getDrawingHistory());
    }
  }

  onCanvasClear() {
    if (!this.databaseUpdating) {
      this.deleting = true;
      this.boardService.delete(this.currentBoard.id).subscribe(data => {
        this.sendUpdates = [];
        this.drawnUpdates = [];
        this.currentBoard = new Board();
        this.deleting = false;
        console.log("Database was emptied.");
      })
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
    // first check if mouse is being used or a delete action is happening
    if (!this.drawing && !this.deleting ){
      //&& !this.canvasWhiteboard.drawingEnabled) {
      this.drawing = false; 
      this.deleting = false;
      this.databaseUpdating = true;
      console.log("refreshing from db!");
      this.boardService.find(this.currentBoard.id).subscribe(data => {
        if (data != null) {
          console.log("refreshing from db! [data != null]");
          // now check if updates dont contain undefined
          // this.currentBoard = data
          if (data.canvasWhiteboardUpdates != null) {
            this.databaseEmptied = false;
            if (data.canvasWhiteboardUpdates.length > 0) {
              var allCorrect: boolean = true;
              var endIndexes: number[] = [0];
              var cleanUpdates: CanvasWhiteboardUpdate[] = [];
              data.canvasWhiteboardUpdates.forEach((element, index) => {
                if (element == undefined || element == null) {
                  allCorrect = false;
                } else if (element.type == 2) {
                  endIndexes.push(index+1);
                  cleanUpdates.push(this.cleanUpUpdate(element));
                } else {
                  cleanUpdates.push(this.cleanUpUpdate(element));
                }
              });
              if (allCorrect) {
                console.log("refreshing from db! [allCorrect]");
                // console.log(this.canvasWhiteboard.getDrawingHistory())
                var sendUpdates: CanvasWhiteboardUpdate[] = [];
                var finishedUpdatesSlice: CanvasWhiteboardUpdate[] = cleanUpdates.slice(0, endIndexes[endIndexes.length-1]);
                
                // add only if not drawn yet.

                finishedUpdatesSlice.forEach(childUpdate => {
                  if (!this.drawnUpdates.some((parentUpdate) => (
                    childUpdate.UUID == parentUpdate.UUID &&
                    childUpdate.x == parentUpdate.x &&
                    childUpdate.y == parentUpdate.y &&
                    childUpdate.selectedShape == parentUpdate.selectedShape &&
                    childUpdate.type == parentUpdate.type
                  ))) {
                    sendUpdates.push(childUpdate);
                  }
                })

                if (sendUpdates.length > 0) {
                  // console.log("new update!");
                  this.sendUpdates = sendUpdates;
                  this.drawPerUUID(this.sendUpdates)
                  this.drawnUpdates.push(...this.sendUpdates)
                  this.sendUpdates = []
                } else {
                }
              }
            } else {
              this.databaseEmptied = true;
              this.canvasWhiteboard.clearCanvas();
            }
          }
        }
        this.databaseUpdating = false;
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

  cleanUpUpdate(update: CanvasWhiteboardUpdate) {
    // cleans up updates (reinitializes them with only important values)
    // check if shapeoptions is defined.
    var newShapeOptions = new CanvasWhiteboardShapeOptions()
    if (update.selectedShapeOptions != null) {
      newShapeOptions.shouldFillShape = update.selectedShapeOptions.shouldFillShape
      newShapeOptions.fillStyle = update.selectedShapeOptions.fillStyle
      newShapeOptions.strokeStyle = update.selectedShapeOptions.strokeStyle
      newShapeOptions.lineWidth = update.selectedShapeOptions.lineWidth
      newShapeOptions.lineJoin = update.selectedShapeOptions.lineJoin
      newShapeOptions.lineCap = update.selectedShapeOptions.lineCap
    }
    return (new CanvasWhiteboardUpdate(update.x, update.y, update.type, update.UUID, update.selectedShape, newShapeOptions))
  }

  drawPerUUID(updates: CanvasWhiteboardUpdate[]) {
    // this assumes the updates are in correct order!
    var updateSet: CanvasWhiteboardUpdate[] = [];
    updates.forEach(element => {
      updateSet.push(element)
      if (element.type == 2) {
        console.log("finished!")
        if (updateSet[0].type == 0) {
          this.canvasWhiteboard.drawUpdates(updateSet);
        }
        updateSet = [];
      }
    })
  }

  printDebugInfo() {
    console.log(this.drawing)
    console.log(this.deleting)
    console.log(this.canvasWhiteboard.drawingEnabled)
    console.log(this.databaseUpdating)
    console.log(this.databaseEmptied)
  }

  testButton() {
    this.canvasWhiteboard.drawUpdates([
      new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 0, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape"),
      new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 2, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape"),
      new CanvasWhiteboardUpdate(0.45661764705882354, 0.403399209486166, 0, "f6e3ea98-362b-de26-eff3-f78938ed3a0f", "FreeHandShape"),
      new CanvasWhiteboardUpdate(0.45661764705882354, 0.403399209486166, 2, "f6e3ea98-362b-de26-eff3-f78938ed3a0f", "FreeHandShape")
    ]);
  }
}
