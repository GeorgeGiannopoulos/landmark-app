import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../core/services';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit {
    isLoggedIn$: Observable<boolean>;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.isLoggedIn;
        this.authService.logout();
    }
}
