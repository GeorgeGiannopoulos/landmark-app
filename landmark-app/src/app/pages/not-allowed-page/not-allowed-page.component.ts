import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-allowed-page',
    templateUrl: './not-allowed-page.component.html',
    styleUrls: ['./not-allowed-page.component.scss'],
})
export class NotAllowedPageComponent implements OnInit {
    constructor(private router: Router, private location: Location) {}

    ngOnInit(): void {}

    backClicked() {
        this.location.back();
    }

    homeClicked() {
        this.router.navigateByUrl('/pages/home');
    }

}
