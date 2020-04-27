import { Component, OnInit } from '@angular/core';
import { MenuBarComponent} from '../menu-bar/menu-bar.component';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent{

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  // menuBar: Menu

}
