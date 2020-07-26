import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { NotAllowedPageComponent } from './pages/not-allowed-page/not-allowed-page.component';

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
    },
    { path: '404', component: NotFoundPageComponent},
    { path: 'access-denied', component: NotAllowedPageComponent },
    { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
