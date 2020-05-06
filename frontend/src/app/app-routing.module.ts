import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BoardComponent } from './board/board.component';


const routes: Routes = [
  {path: '', component: HomeComponent, runGuardsAndResolvers: 'always'},
  // {path: 'board', component: BoardComponent, runGuardsAndResolvers: 'always'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation : 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
