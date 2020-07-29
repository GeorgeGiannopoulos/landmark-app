import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
        public dialog: MatDialog,
        private matSnackBar: MatSnackBar
    ) {}

    ngOnInit(): void {
        this.getLandmarks();
    }

    // =========== Component Custom Methods ===========
    private getLandmarks() {
        this.landmarkService.getLandmarks().subscribe(
            (landmarks) => (this.landmarks = landmarks),
            (err) => this.matSnackBar.open(err.message, '')
        );
    }

    // =========== UI Methods ===========
    public openDialog(photo: string): void {
        if (photo !== '') {
            const dialogRef = this.dialog.open(FullPhotoFrameComponent, {
                data: { photo },
            });
    
            dialogRef.afterClosed().subscribe((result) => {});
        }
    }
}
