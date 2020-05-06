import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './slateroom-routing.module';
import { LayoutComponent } from './layout.component';
import { CreateComponent } from './create.component';
import { EnterComponent } from './enter.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RoomRoutingModule
    ],
    declarations: [
        LayoutComponent,
        CreateComponent,
        EnterComponent
    ]
})
export class RoomModule { }