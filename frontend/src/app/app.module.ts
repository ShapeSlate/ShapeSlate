import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AppComponent } from './app.component';
import { CanvasblobComponent } from './canvasblob/canvasblob.component';
/* look at dis */
import { SessionComponent } from './session/session.component';
import { UserComponent } from './user/user.component';
import { SlateRoomComponent } from './slateroom/slateroom.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasblobComponent,
    SessionComponent,
    UserComponent,
    SlateRoomComponent
    /* look at sessioncomponent and slateroomcoponent */
  ],
  imports: [
    BrowserModule,
    CanvasWhiteboardModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
