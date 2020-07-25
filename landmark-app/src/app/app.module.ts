import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// core module
import { CoreModule } from './core/core.module';
// pages module
import { PagesModule } from './pages/pages.module';

// Constants
const MODULES = [
    CoreModule,
    PagesModule,
];

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ...MODULES],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
