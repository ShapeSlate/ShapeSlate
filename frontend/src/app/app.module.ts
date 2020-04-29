import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { AppComponent } from './app.component';
import { CanvasblobComponent } from './canvasblob/canvasblob.component';
import { SessionComponent } from './session/session.component';
import { UserComponent } from './user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GeneralLayoutComponent } from './general-layout/general-layout.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    CanvasblobComponent,
    SessionComponent,
    UserComponent,
    GeneralLayoutComponent,
    MenuBarComponent
    

  ],
  imports: [
    BrowserModule,
    CanvasWhiteboardModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }