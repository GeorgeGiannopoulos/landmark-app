import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
    photo: string;
}

@Component({
    selector: 'app-full-photo-frame',
    template: `
        <div mat-dialog aria-label="Picture">
            <div mat-dialog-content class="dialog-picture">
                <div>
                    <img [src]="data.photo
                                ? data.photo
                                : 'https://via.placeholder.com/250x250?text=Image+Not+Found+!'"
                    />
                </div>
            </div>
        </div>
    `,
    styles: [`
        .dialog-picture {
            max-height: none;
            img {
                display: block;
                max-width: 100%;
                height: 100%;
            }
        }
    `],
})
export class FullPhotoFrameComponent implements OnInit {

    // =========== Component Methods ===========
    constructor(
        public dialogRef: MatDialogRef<FullPhotoFrameComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

    ngOnInit(): void {}

}
