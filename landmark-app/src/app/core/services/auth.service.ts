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
    private role = new BehaviorSubject<string>('');

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    get isRole() {
        return this.role.asObservable();
    }

    constructor(private router: Router, private location: Location) {}

    login(user: User) {
        // Create a new instance of the user class
        return new Promise(async (resolve, reject) => {
            Parse.User.logIn(user.username, user.password)
                .then((current_user) => {
                    this.getUserRole(current_user.get('username'))
                        .then((role) => {
                            this.loggedIn.next(true);
                            this.role.next(role);
                            const navigationHistory = this.location.getState();
                            if (navigationHistory['navigationId'] > 1) {
                                this.location.back();
                            } else {
                                this.router.navigate(['/pages/home']);
                            }
                            resolve();
                        })
                        .catch((err) => {
                            reject(err);
                        });
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }

    logout() {
        this.loggedIn.next(false);
        this.router.navigate(['/pages/home']);
    }

    async getUserRole(username: string) {
        const query = await new Parse.Query(Parse.User).equalTo('username', username).find();
        return query[0].get('role');
    }
}
