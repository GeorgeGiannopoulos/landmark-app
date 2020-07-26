import { Component, OnInit } from '@angular/core';
import { LandmarkService } from '../../services';
import { Landmark } from '../../models';

@Component({
    selector: 'app-landmarks',
    templateUrl: './landmarks.component.html',
    styleUrls: ['./landmarks.component.scss'],
})
export class LandmarksComponent implements OnInit {
    public landmarks: Landmark[];

    // =========== Component Methods ===========
    constructor(private landmarkService: LandmarkService) {}

    ngOnInit(): void {
        this.getLandmarks();
    }

    // =========== Component Custom Methods ===========
    private getLandmarks() {
        this.landmarkService.getLandmarks().subscribe((landmarks) => {
            this.landmarks = landmarks;
            // console.log(this.landmarks);
        });
    }
}
