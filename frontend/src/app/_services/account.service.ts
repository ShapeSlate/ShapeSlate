import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { SlateUser } from '../_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private slateUserSubject: BehaviorSubject<SlateUser>;
    public slateUser: Observable<SlateUser>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.slateUserSubject = new BehaviorSubject<SlateUser>(JSON.parse(localStorage.getItem('slateUser')));
        this.slateUser = this.slateUserSubject.asObservable();
    }

    public get slateUserValue(): SlateUser {
        return this.slateUserSubject.value;
    }

    login(username, password) {
        return this.http.post<SlateUser>(`${environment.apiUrl}/login`, { username, password })
            .pipe(map(slateUser => {
                // store slateUser details and jwt token in local storage to keep slateUser logged in between page refreshes
                localStorage.setItem('slateUser', JSON.stringify(slateUser));
                this.slateUserSubject.next(slateUser);
                return slateUser;
            }));
    }

    logout() {
        // remove slateUser from local storage and set current slateUser to null
        localStorage.removeItem('slateUser');
        this.slateUserSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(slateUser: SlateUser) {
        return this.http.post(`${environment.apiUrl}/register`, slateUser);
    }
}
