import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';

import { LandmarkService } from '../../services';
import { Landmark } from '../../models';

@Component({
    selector: 'app-landmark-edit',
    templateUrl: './landmark-edit.component.html',
    styleUrls: ['./landmark-edit.component.scss'],
})
export class LandmarkEditComponent implements OnInit, OnChanges {
    @Input() id: string;
    public landmark: Landmark;

    // =========== Component Methods ===========    
    constructor(private landmarkService: LandmarkService) {}

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
    public onSumbit() {
        
    }
}
