import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SlateRoom } from '../_models';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RoomService {
    private roomSubject: BehaviorSubject<SlateRoom>;
    public room: Observable<SlateRoom>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.roomSubject = new BehaviorSubject<SlateRoom>(JSON.parse(localStorage.getItem('room')));
        this.room = this.roomSubject.asObservable();
    }

    public get roomValue(): SlateRoom {
        return this.roomSubject.value;
    }

    enter(roomname) {
        return this.http.post<SlateRoom>(`${environment.apiUrl}/enter`, { roomname })
            .pipe(map(room => {
                // store room details and jwt token in local storage to keep room entered between page refreshes
                localStorage.setItem('room', JSON.stringify(room));
                this.roomSubject.next(room);
                return room;
            }));
    }

    exit() {
        // remove room from local storage and set current room to null
        localStorage.removeItem('room');
        this.roomSubject.next(null);
        this.router.navigate(['/room/enter']);
    }

    create(room: SlateRoom) {
        return this.http.post(`${environment.apiUrl}/create`, room);
    }

    getAll() {
        return this.http.get<SlateRoom[]>(`${environment.apiUrl}/room`);
    }

    getById(id: string) {
        return this.http.get<SlateRoom>(`${environment.apiUrl}/room/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/room/${id}`, params)
            .pipe(map(x => {
                // update stored room if the logged in user updated their own record
                if (id == this.roomValue.id) {
                    // update local storage
                    const room = { ...this.roomValue, ...params };
                    localStorage.setItem('room', JSON.stringify(room));

                    // publish updated room to subscribers
                    this.roomSubject.next(room);
                }
                return x;
            }));
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/room/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in room deleted their own record
                if (id == this.roomValue.id) {
                    this.exit();
                }
                return x;
            }));
    }
}