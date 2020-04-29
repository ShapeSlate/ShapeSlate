import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { UserComponent } from './user/user.component';
import { SlateRoomComponent } from './slateroom/slateroom.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    UserComponent,
    SlateRoomComponent
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
