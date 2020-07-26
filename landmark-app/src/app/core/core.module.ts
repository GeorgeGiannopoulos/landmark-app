import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout/layout.component';
import {
    HeaderComponent,
    LandmarksComponent,
    LandmarkViewComponent,
    LandmarkEditComponent,
    SidebarComponent,
} from './components';
import { FullPhotoFrameComponent } from './dialogs';

const COMPONENTS = [
    HeaderComponent,
    LandmarksComponent,
    SidebarComponent,
    LandmarkViewComponent,
    LandmarkEditComponent,
    FullPhotoFrameComponent,
];

const ENTRY_COMPONENTS = [
    FullPhotoFrameComponent,
];

@NgModule({
    declarations: [LayoutComponent, ...COMPONENTS, FullPhotoFrameComponent],
    imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule, ReactiveFormsModule],
    exports: [CommonModule, LayoutComponent, ...COMPONENTS],
    entryComponents: [...ENTRY_COMPONENTS],
})
export class CoreModule {}
