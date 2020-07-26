import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '../material/material.module';

import { LayoutComponent } from './layout/layout.component';
import {
    HeaderComponent,
    LandmarksComponent,
    LandmarkViewComponent,
    SidebarComponent,
} from './components';

const COMPONENTS = [
    HeaderComponent,
    LandmarksComponent,
    SidebarComponent,
    LandmarkViewComponent,
];

@NgModule({
    declarations: [LayoutComponent, ...COMPONENTS],
    imports: [CommonModule, RouterModule, FlexLayoutModule, MaterialModule],
    exports: [CommonModule, LayoutComponent, ...COMPONENTS],
})
export class CoreModule {}
