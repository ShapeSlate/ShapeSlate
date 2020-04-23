import {Component, ViewEncapsulation, ViewChild} from '@angular/core';
import {CanvasWhiteboardUpdate} from 'ng2-canvas-whiteboard';
import {CanvasWhiteboardComponent} from 'ng2-canvas-whiteboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('canvasWhiteboard') canvasWhiteboard: CanvasWhiteboardComponent;
  myupdates: CanvasWhiteboardUpdate[] = [];
  tempupdate: CanvasWhiteboardUpdate[] = [];


  sendBatchUpdate(updates: CanvasWhiteboardUpdate[]) {
    for (let i = 0; i < updates.length; i++) {
      this.tempupdate.push(updates[i]);
    }
    this.myupdates = updates;
    // this.myupdates = this.tempupdate;
    console.log(updates);
  }
  onCanvasClear() {
    // drawUpdates
    // [ { "x": 0.35661764705882354, "y": 0.383399209486166, "type": 0, "UUID": "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "selectedShape": "FreeHandShape", "selectedShapeOptions": { "shouldFillShape": true, "fillStyle": "rgba(0,0,0,0)", "strokeStyle": "rgba(0, 0, 0, 1)", "lineWidth": 2, "lineJoin": "round", "lineCap": "round" } }, { "x": 0.35661764705882354, "y": 0.383399209486166, "type": 2, "UUID": "f5e3ea98-362b-de26-eff3-f78938ed3a0e" } ] 
    // new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 0, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape");
    // [ { "x": 0.49107142857142855, "y": 0.5770750988142292, "type": 2, "UUID": "5daf4fd0-89c9-0a2a-540f-7274fa54c018" } ] 
    // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.35661764705882354, 0.383399209486166, 0, "f5e3ea98-362b-de26-eff3-f78938ed3a0e", "FreeHandShape")]);
    // this.canvasWhiteboard.drawUpdates([new CanvasWhiteboardUpdate(0.49107142857142855, 0.5770750988142292, 2, "5daf4fd0-89c9-0a2a-540f-7274fa54c018")]);
    console.log("The canvas was cleared");
  }
  onCanvasUndo(updateUUID: string) {
    console.log(`UNDO with uuid: ${updateUUID}`);
  }
  onCanvasRedo(updateUUID: string) {
    
    console.log(`REDO with uuid: ${updateUUID}`);
  }

  yay(){
    console.log("test");
    console.log(this.tempupdate);
    this.canvasWhiteboard.drawUpdates(this.tempupdate);
  }
}