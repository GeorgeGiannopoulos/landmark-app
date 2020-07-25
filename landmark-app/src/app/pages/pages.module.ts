import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';

// Pages
import { HomePageComponent } from './home-page/home-page.component';

const PAGES = [HomePageComponent];

@NgModule({
    declarations: [PagesComponent, ...PAGES],
    imports: [CommonModule, RouterModule, PagesRoutingModule],
    exports: [...PAGES],
})
export class PagesModule {}
