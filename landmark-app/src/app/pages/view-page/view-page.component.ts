import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-view-page',
    templateUrl: './view-page.component.html',
    styleUrls: ['./view-page.component.scss'],
})
export class ViewPageComponent implements OnInit {
    id: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.params.id;
    }
}
