import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();
    isLoggedIn$: Observable<boolean>;

    // =========== Component Methods ===========
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

    // =========== Component Custom Methods ===========
    public onSidenavClose = () => {
        this.sidenavClose.emit();
    };
}
