import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
    @Output() sidenavClose = new EventEmitter();

    // =========== Component Methods ===========
    constructor() {}

    ngOnInit(): void {}

    // =========== Component Custom Methods ===========
    public onSidenavClose = () => {
        this.sidenavClose.emit();
    };
}
