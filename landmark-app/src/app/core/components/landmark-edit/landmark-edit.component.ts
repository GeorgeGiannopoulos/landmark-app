import { Component, OnInit, OnChanges } from '@angular/core';
import { Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

    // Initialize landmark FormGroup variables
    landmarkForm: FormGroup;
    private formSubmitAttempt: boolean;

    // =========== Component Methods ===========
    constructor(private landmarkService: LandmarkService,
                private fb: FormBuilder,
                private matSnackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.createForm();
    }

    ngOnChanges(change: SimpleChanges) {
        if (change.id.currentValue) {
            this.getLandmark(change.id.currentValue);
        }
    }

    // =========== Component Custom Methods ===========
    private createForm() {
        this.landmarkForm = this.fb.group({
            title: ['', Validators.required],
            description: ['', Validators.required],
            short_info: ['', Validators.required],
            url: ['', Validators.required],
        });
    }

    private editForm(landmark) {
        this.landmarkForm.setValue({
            title: landmark.title,
            description: landmark.description,
            short_info: landmark.short_info,
            url: landmark.url,
        });
    }

    private getLandmark(id: string) {
        this.landmarkService.getLandmarksByID(id).subscribe(
            (landmark) => {
                this.landmark = landmark;
                this.editForm(landmark);
            },
            (err) => this.matSnackBar.open('Failed to retrieve landmark by ID', '')
        );
    }

    private validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    // =========== UI Methods ===========
    public onSubmit(form: FormGroup) {
        if (form.valid) {
            this.landmark.title = form.get('title').value;
            this.landmark.description = form.get('description').value;
            this.landmark.short_info = form.get('short_info').value;
            this.landmark.url = form.get('url').value;
            this.landmarkService.updateLandmark(this.landmark).subscribe(
                (landmark) => {
                    this.landmark = landmark;
                    this.matSnackBar.open('Landmark updated', '');
                },
                (err) => this.matSnackBar.open('Failed to update landmark', '')
            );
        } else {
            this.validateAllFormFields(form);
        }

        this.formSubmitAttempt = true;
    }

    public isFieldInvalid(field: string) {
        return (
            (!this.landmarkForm.get(field).valid && this.landmarkForm.get(field).touched) ||
            (this.landmarkForm.get(field).untouched && this.formSubmitAttempt)
        );
    }

    public onFileChanged(event) {
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append('photo', imageFile);
        this.landmarkService.updateLandmarkPhoto(this.landmark, formData).subscribe(
            (landmark: Landmark) => {
                this.landmark = landmark;
                this.matSnackBar.open('Landmark updated', '');
            },
            (err) => this.matSnackBar.open((err.error.message
                                            ? err.error.message
                                            : 'Failed to update landmark photo'), '')
        );
    }

}
