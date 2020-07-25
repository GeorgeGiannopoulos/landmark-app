import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    @Output() public sidenavToggle = new EventEmitter();

    // =========== Component Methods ===========
    constructor() {}

    ngOnInit(): void {}

    // =========== Component Custom Methods ===========
    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    };
}
