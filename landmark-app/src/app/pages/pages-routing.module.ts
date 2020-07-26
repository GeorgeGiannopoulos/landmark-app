import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService, RoleGuardService } from '../core/services';

import { PagesComponent } from './pages.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ViewPageComponent } from './view-page/view-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

const routes: Routes = [
    {
        path: '',
        component: PagesComponent,
        children: [
            {
                path: '',
                redirectTo: '/pages/home',
                pathMatch: 'full',
            },
            {
                path: 'home',
                component: HomePageComponent,
            },
            {
                path: 'view/:id',
                component: ViewPageComponent,
            },
            {
                path: 'edit/:id',
                canActivate: [AuthGuardService, RoleGuardService],
                component: EditPageComponent,
                data: {
                    role: 'admin',
                },
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PagesRoutingModule {}
