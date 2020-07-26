import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    form: FormGroup;
    private formSubmitAttempt: boolean;

    // =========== Component Methods ===========
    constructor(private fb: FormBuilder,
        private authService: AuthService,
        private location: Location,
        private matSnackBar: MatSnackBar) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });
    }

    // =========== Component Custom Methods ===========
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
    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    onAdmin() {
        if (this.form.valid) {
            this.authService.login(this.form.value)
            .catch((err) => {
                this.matSnackBar.open('Login Failed', '')
                this.form.reset();
            });
        } else {
            this.validateAllFormFields(this.form);
        }
        this.formSubmitAttempt = true;
    }

    onGuest() {
        this.location.back();
    }
}
