import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { CreateComponent } from './create.component';
import { EnterComponent } from './enter.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'create', component: CreateComponent },
            { path: 'enter', component: EnterComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoomRoutingModule { }
