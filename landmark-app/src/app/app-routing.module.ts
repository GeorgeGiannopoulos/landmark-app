import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

const routes: Routes = [
    {
        path: 'pages',
        loadChildren: () =>
            import('./pages/pages.module').then((m) => m.PagesModule),
    },
    { path: '404', component: NotFoundPageComponent}, 
    { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
