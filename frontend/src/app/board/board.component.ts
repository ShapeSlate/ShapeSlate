import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CanvasWhiteboardUpdate, CanvasWhiteboardShapeOptions, CanvasWhiteboardShapeSelectorComponent, CanvasWhiteboardShapeService, CanvasWhiteboardService} from 'ng2-canvas-whiteboard';
import { CanvasWhiteboardComponent } from 'ng2-canvas-whiteboard';
import { BoardService } from '../_services';
import { Board } from '../_models';
import * as EmojiPicker from "vanilla-emoji-picker";

declare function setFunctionSlider(): void;
declare function setSliderValue(myvalue): void;

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BoardComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    public boardService: BoardService, 
    private elementRef: ElementRef, 
    private _canvasWhiteboardService: CanvasWhiteboardService, 
    private _canvasWhiteboardShapeService: CanvasWhiteboardShapeService) {
  }

  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  @ViewChild('canvasWrapperDiv') canvasWhiteboardButtons: ElementRef;

  currentBoard: Board = new Board;
  drawnUpdates = [];
  sendUpdates: CanvasWhiteboardUpdate[] = [];
  databaseEmptied: boolean = false;
  drawing: boolean = false;
  deleting: boolean = false;
  databaseUpdating: boolean = false;

  customButtons = [
    ['Eraser' , this.eraser],
    ['Reset Options' , this.resetOptionsButton]
  ];

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
      // console.log(this.canvasWhiteboard.getDrawingHistory());
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

  drawDatabaseUpdates() {
    // first check if mouse is being used or a delete action is happening
    if (!this.drawing && !this.deleting ){
      //&& !this.canvasWhiteboard.drawingEnabled) {
      this.drawing = false; 
      this.deleting = false;
      this.databaseUpdating = true;
      // console.log("refreshing from db!");
      this.boardService.find(this.currentBoard.id).subscribe(data => {
        if (data != null) {
          // console.log("refreshing from db! [data != null]");
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
                // console.log("refreshing from db! [allCorrect]");
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
                  // this.sendUpdates = [];
                  // console.log("nothing new!");
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
    new EmojiPicker;
    setInterval(() => {
      // console.log("interval")
      // this.printDebugInfo()
      this.drawDatabaseUpdates();
    }, 1000);
  }

  ngAfterViewInit() {
    this.customButtons.forEach(element => {
      this.extraButton(element[0], element[1])
    })
    // add slider
    // <div class="slidecontainer"><input type="range" min="1" max="100" value="50" class="slider" id="myRange"></div>
    var buttonDiv: Element = document.getElementsByClassName("canvas_whiteboard_buttons")[0];
    buttonDiv.insertAdjacentHTML("beforeend", '<div class="slidecontainer"><input name="linewidthslider" type="range" min="1" max="50" value="2" class="slider" id="myRange"></div>');
    var inputSlider: Element = document.getElementsByName("linewidthslider")[0];
    inputSlider.addEventListener('input', this.setLinewidthWithSlider.bind(this))
    console.log(inputSlider.getAttribute("value"));
    this.resetOptionsButton();
    // setFunctionSlider();
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

  extraButton(name, fun) {
    var buttonDiv: Element = document.getElementsByClassName("canvas_whiteboard_buttons")[0];
    var drawButton: Element =  document.getElementsByClassName("canvas_whiteboard_button-draw")[0];
    // get current ngclass
    var ngclass;
    (drawButton.getAttributeNames()).forEach((element: string) => {
      if (element.startsWith("_ngcontent-")) {
        ngclass = element;
      }
    });
    var customClass = 'canvas_whiteboard_button-'+name.replace(/\s/g, "").toLowerCase();
    buttonDiv.insertAdjacentHTML("beforeend", '<button type="button" class="canvas_whiteboard_button '+customClass+'" '+ngclass+'> '+name+' </button>');
    var thing: Element =  document.getElementsByClassName(customClass)[0];
    thing.addEventListener('click', fun.bind(this));
  }

  eraser() {
    this.canvasWhiteboard.changeStrokeColor('#ffffff');
    this.canvasWhiteboard.changeFillColor('#ffffff');
    this.setCanvasWhiteboardLineWidth(20);
    // set freehand
    this.canvasWhiteboard.selectShape(this._canvasWhiteboardShapeService.getCurrentRegisteredShapes()[0]);
  }

  resetOptionsButton() {
    this.canvasWhiteboard.changeStrokeColor('#000000');
    this.canvasWhiteboard.changeFillColor('#ffffff');
    this.setCanvasWhiteboardLineWidth(2);
    // set freehand
    this.canvasWhiteboard.selectShape(this._canvasWhiteboardShapeService.getCurrentRegisteredShapes()[0]);
  }

  setLinewidthWithSlider() {
    setFunctionSlider();
    var inputSlider: Element = document.getElementsByName("linewidthslider")[0];
    this.canvasWhiteboard.lineWidth = parseInt(inputSlider.getAttribute("value"), 10); 
    console.log(inputSlider.getAttribute("value"));
  }

  printDebugInfo() {
    console.log(
      "===DrawingEnabled===;\n" + JSON.stringify(this.canvasWhiteboard.getDrawingEnabled()) +
      "\n===ShouldDraw===;\n" + JSON.stringify(this.canvasWhiteboard.getShouldDraw()) +
      "\n===DrawingHistory===;\n" + JSON.stringify(this.canvasWhiteboard.getDrawingHistory())
    );
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

  testConsoleFucntion() {
    console.log("test")
  }

  setCanvasWhiteboardLineWidth(width: number) {
    this.canvasWhiteboard.lineWidth = width;
    setSliderValue(width);
  }
}
