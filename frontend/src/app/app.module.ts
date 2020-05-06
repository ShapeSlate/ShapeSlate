import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { UserComponent } from './user/user.component';
import { SlateRoomComponent } from './slateroom/slateroom.component';
import { HttpClientModule } from '@angular/common/http';
import { MessageBoxComponent } from './message-box/message-box.component';
import { ChatBoxComponent } from './chat-box/chat-box.component';
import { ChatLogComponentComponent } from './chat-log-component/chat-log-component.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    UserComponent,
    SlateRoomComponent,
    MessageBoxComponent,
    ChatBoxComponent,
    ChatLogComponentComponent
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
