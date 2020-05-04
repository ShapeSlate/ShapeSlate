import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild } from '@angular/core';
import { CanvasWhiteboardUpdate, CanvasWhiteboardModule, CanvasWhiteboardShapeOptions } from 'ng2-canvas-whiteboard';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { BoardService } from '../board.service';
import { Board } from '../board';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(public boardService: BoardService) {//, private router: Router) {
    // subscribe to the router events - storing the subscription so
    // we can unsubscribe later.    
    // this.navigationSubscription = this.router.events.subscribe((e: any) => {
    //   // If it is a NavigationEnd event re-initalise the component
    //   if (e instanceof NavigationEnd) {
    //   }
    // });
  }

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  currentBoard: Board = new Board;
  drawnUUIDs = [];
  sendUpdates: CanvasWhiteboardUpdate[] = [];
  // databaseEmptied: boolean = false;
  // navigationSubscription;

  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    // console.log(updates)
    let board = new Board()
    board.canvasWhiteboardUpdates = updates
    this.boardService.save(board).subscribe()
    console.log(this.canvasWhiteboard.getDrawingHistory())
  }

  onCanvasClear() {
    this.printDebugInfo()
    this.boardService.delete(this.currentBoard.id).subscribe(data => {
      console.log("database was emptied.")
    })
    this.sendUpdates = []
    this.drawnUUIDs = []
    this.currentBoard = new Board()
    console.log("The canvas was cleared");
    // this.router.navigateByUrl('/board')
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
          if (data.canvasWhiteboardUpdates.length > 0) {
            var allCorrect: boolean = true;
            var endIndexes: number[] = [0];
            var cleanUpdates: CanvasWhiteboardUpdate[] = [];
            data.canvasWhiteboardUpdates.forEach((element, index) => {
              if (element == undefined || element == null) {
                allCorrect = false;
              } else if (element.type == 2 || element.type == 1) {
                endIndexes.push(index);
                cleanUpdates.push(this.cleanUpUpdate(element))
              } else{
                cleanUpdates.push(this.cleanUpUpdate(element))
              }
            });
            if (allCorrect) {
              console.log("refreshing from db! [allCorrect]");
              // console.log(this.canvasWhiteboard.getDrawingHistory())
              var sendUpdates: CanvasWhiteboardUpdate[] = []
              var newUUIDs = []
              var finishedUpdatesSlice: CanvasWhiteboardUpdate[] = cleanUpdates.slice(0, endIndexes[endIndexes.length - 1])
              // add only if not drawn yet.
              finishedUpdatesSlice.forEach(childUpdate => {
                if (!this.canvasWhiteboard.getDrawingHistory().some((parentUpdate) => (
                  childUpdate.UUID == parentUpdate.UUID &&
                  childUpdate.x == parentUpdate.x &&
                  childUpdate.y == parentUpdate.y &&
                  childUpdate.selectedShape == parentUpdate.selectedShape &&
                  childUpdate.type == parentUpdate.type
                ))) {
                  sendUpdates.push(childUpdate)
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
          // } else {
          //   this.databaseEmptied = true;
          // }

        }
      }
    })
  }

  ngOnInit(): void {
    // history not registered with foreign drawUpdates?... (BUG)
    setInterval(() => {
      this.printDebugInfo()
      // console.log("interval")
      // console.log(console.log(this.canvasWhiteboard.getDrawingHistory()))
      this.drawDatabaseUpdates();
      // this.canvasWhiteboard.clearCanvas()
      this.drawPerUUID(this.sendUpdates)
      this.sendUpdates = []
      // if (this.databaseEmptied) {
      //   this.router.navigateByUrl('/board')
      // }
    }, 500);
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we  
    // don't then we will continue to run our initialiseInvites()   
    // method on every navigationEnd event.
    // if (this.navigationSubscription) {
    //   this.navigationSubscription.unsubscribe();
    // }
  }

  cleanUpUpdate(update: CanvasWhiteboardUpdate) {
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
    var updateSet: CanvasWhiteboardUpdate[] = []; 
    updates.forEach(element => {
      updateSet.push(element)  
      if (element.type == 2) {
          this.canvasWhiteboard.drawUpdates(updateSet)
          updateSet = []
        }
    })
  }

  printDebugInfo() {
    console.log(
      "===DrawingEnabled===;\n"+JSON.stringify(this.canvasWhiteboard.getDrawingEnabled())+
      "\n===ShouldDraw===;\n"+JSON.stringify(this.canvasWhiteboard.getShouldDraw())+
      "\n===DrawingHistory===;\n"+JSON.stringify(this.canvasWhiteboard.getDrawingHistory())
    )
  }
}
