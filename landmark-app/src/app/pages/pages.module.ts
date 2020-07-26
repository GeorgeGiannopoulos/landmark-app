import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

import { MaterialModule } from '../material/material.module';

// core
import { CoreModule } from '../core/core.module';
// Pages
import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { NotAllowedPageComponent } from './not-allowed-page/not-allowed-page.component';

// Constants
const CORE = [CoreModule];

const PAGES = [
    HomePageComponent,
    ViewPageComponent,
    EditPageComponent,
    NotFoundPageComponent,
    NotAllowedPageComponent,
];

@NgModule({
    declarations: [PagesComponent, ...PAGES],
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        ...CORE,
        MaterialModule,
    ],
    exports: [...PAGES],
})
export class PagesModule {}
