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
  myupdates: CanvasWhiteboardUpdate[] = [];
  tempupdate: CanvasWhiteboardUpdate[] = [];


  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    let board = new Board()
    board.canvasWhiteBoardUpdate = updates
    this.boardService.save(board).subscribe()
  }

  onCanvasClear() {
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
    console.log(this.tempupdate);
    this.canvasWhiteboard.drawUpdates(this.tempupdate);
  }

  ngOnInit(): void {
  }

}
