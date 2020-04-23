import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SlateRoomComponent } from './slateroom/slateroom.component';
import { CanvasblobComponent } from './canvasblob/canvasblob.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SlateRoomComponent,
    CanvasblobComponent
  ],
  imports: [
    BrowserModule,
    CanvasWhiteboardModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }