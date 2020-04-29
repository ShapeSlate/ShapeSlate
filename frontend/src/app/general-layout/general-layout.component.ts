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

}
