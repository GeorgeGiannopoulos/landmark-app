import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Parse } from 'parse';
import { User } from '../models';
import { environment } from '../../../environments/environment';

Parse.initialize(environment.PARSE_SERVER.APP_ID);
Parse.serverURL = environment.PARSE_SERVER.BASE_URL + environment.PARSE_SERVER.MOUNT_URL;

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(private router: Router) {}

    login(user: User) {
        // Create a new instance of the user class
        const _user = Parse.User.logIn(user.username, user.password)
            .then((user) => {
                this.loggedIn.next(true);
                this.router.navigate(['/pages/home']);
            })
            .catch((err) => {});
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/pages/home']);
    }
}
