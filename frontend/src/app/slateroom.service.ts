import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlateRoom } from './slateroom';

@Injectable({
  providedIn: 'root'
})
export class SlateRoomService {

  constructor(private http: HttpClient) { }

  findAll(): Observable<SlateRoom[]> {
    return this.http.get<any>("http://localhost:8080/slateroom")
  }

  create(slateRoom: SlateRoom) {
    return this.http.post("http://localhost:8080/slateroom", slateRoom)
  }

  join(name: string): Observable<SlateRoom[]> {
    name = name.trim();
    
    const option = name ?
      { params: new HttpParams().set("roomName", name) } : {};
    return this.http.get<SlateRoom[]>("http://localhost:8080/slateroom", option)
  }
}
