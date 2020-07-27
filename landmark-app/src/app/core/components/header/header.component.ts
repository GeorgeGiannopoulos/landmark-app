import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../../../core/services';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() public sidenavToggle = new EventEmitter();
    isLoggedIn$: Observable<boolean>;

    // =========== Component Methods ===========
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.isLoggedIn$ = this.authService.isLoggedIn;
    }

    // =========== Component Custom Methods ===========
    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }
}
