import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

import { LandmarkService } from '../../services';
import { Landmark } from '../../models';

@Component({
    selector: 'app-landmark-view',
    templateUrl: './landmark-view.component.html',
    styleUrls: ['./landmark-view.component.scss'],
})
export class LandmarkViewComponent implements OnInit, OnChanges {
    @Input() id: string;
    public landmark: Landmark;

    // =========== Component Methods ===========
    constructor(private landmarkService: LandmarkService, private router: Router) {}

    ngOnInit(): void {
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.id.currentValue) {
            this.getLandmark(change.id.currentValue);
        }
        
    }

    // =========== Component Custom Methods ===========
    private getLandmark(id: string) {
        this.landmarkService.getLandmarksByID(id).subscribe((landmark) => {
            this.landmark = landmark;
        });
    }

    // =========== UI Methods ===========
    public onClickEdit() {
    }
}
