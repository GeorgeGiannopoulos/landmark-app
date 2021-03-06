import { Component, Input, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FullPhotoFrameComponent } from '../../dialogs';
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
    constructor(
        private landmarkService: LandmarkService,
        private router: Router,
        public dialog: MatDialog,
        private matSnackBar: MatSnackBar
    ) {}

    ngOnInit(): void {}

    ngOnChanges(change: SimpleChanges) {
        if (change.id.currentValue) {
            this.getLandmark(change.id.currentValue);
        }
    }

    // =========== Component Custom Methods ===========
    private getLandmark(id: string) {
        this.landmarkService.getLandmarksByID(id).subscribe(
            (landmark) => (this.landmark = landmark),
            (err) => this.matSnackBar.open('Failed to retrieve landmark by ID', '')
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
