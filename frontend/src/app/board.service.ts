import { Injectable } from '@angular/core';
import { Board } from './board';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  save(board: Board) {
    return this.http.post("http://localhost:8080/board", board)
  }
  
  delete(id: number) {
    return this.http.delete('http://localhost:8080/board/' + id)
  }

  find(id: number) {
    return this.http.get<Board>('http://localhost:8080/board/' + id)
  }
}
