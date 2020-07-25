import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-not-found-page',
    templateUrl: './not-found-page.component.html',
    styleUrls: ['./not-found-page.component.scss'],
})
export class NotFoundPageComponent implements OnInit {
    constructor(private router: Router, private location: Location) {}

    ngOnInit(): void {}

    backClicked() {
        this.location.back();
    }

    homeClicked() {
        this.router.navigateByUrl('/pages/home');
    }

}
