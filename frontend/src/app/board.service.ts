import { Injectable } from '@angular/core';
import { Board } from './board';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  save(board: Board) {
    return this.http.post("http://localhost:8080/board", board)
  }
}
