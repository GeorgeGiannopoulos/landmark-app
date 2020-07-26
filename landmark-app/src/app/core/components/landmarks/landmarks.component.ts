import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FullPhotoFrameComponent } from '../../dialogs';
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
    constructor(
        private landmarkService: LandmarkService,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.getLandmarks();
    }

    // =========== Component Custom Methods ===========
    private getLandmarks() {
        this.landmarkService.getLandmarks().subscribe((landmarks) => {
            this.landmarks = landmarks;
        });
    }

    // =========== UI Methods ===========
    public openDialog(photo: string): void {
        const dialogRef = this.dialog.open(FullPhotoFrameComponent, {
            data: { photo: photo },
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }
}
