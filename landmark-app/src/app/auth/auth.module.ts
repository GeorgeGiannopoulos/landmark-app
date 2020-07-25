import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';

// Constants
const AUTH = [
    LoginComponent,
    LogoutComponent,
];

@NgModule({
  declarations: [AuthComponent, ...AUTH],
  imports: [CommonModule, RouterModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule],
  exports: [...AUTH],
})
export class AuthModule { }
