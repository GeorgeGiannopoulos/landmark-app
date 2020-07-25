import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

// core module
import { CoreModule } from './core/core.module';
// pages module
import { PagesModule } from './pages/pages.module';
// Auth module
import { AuthModule } from './auth/auth.module';

// Constants
const MODULES = [AuthModule, CoreModule, PagesModule];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ...MODULES,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
