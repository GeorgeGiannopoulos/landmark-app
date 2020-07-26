import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
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

    constructor(private router: Router, private location: Location) {}

    login(user: User) {
        // Create a new instance of the user class
        const _user = Parse.User.logIn(user.username, user.password)
            .then((user) => {
                this.loggedIn.next(true);
                const navigationHistory = this.location.getState();
                if (navigationHistory['navigationId'] > 1) {
                    this.location.back();
                } else {
                    this.router.navigate(['/pages/home']);
                }
            })
            .catch((err) => {});
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/pages/home']);
    }
}
