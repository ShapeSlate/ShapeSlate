import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';
import { UserComponent } from './user/user.component';
import { SlateRoomComponent } from './slateroom/slateroom.component';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { HttpClientModule } from '@angular/common/http';
import { MessageBoxComponent } from './message-box/message-box.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BoardComponent,
    UserComponent,
    SlateRoomComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CanvasWhiteboardModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
