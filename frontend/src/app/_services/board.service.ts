import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Board } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  save(board: Board) {
    return this.http.post("/board", board)
  }
  
  delete(id: number) {
    return this.http.delete('/board/' + id)
  }

  find(id: number) {
    return this.http.get<Board>('/board/' + id)
  }
}
