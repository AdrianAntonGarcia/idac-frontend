import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/**
 * Páginas de la web externas
 */

import { LoginComponent } from './pages/external/login/login.component';
import { RegisterComponent } from './pages/external/register/register.component';
import { NoPageFoundComponent } from './pages/external/no-page-found/no-page-found.component';
import { RecoverPasswordComponent } from './pages/external/recover-password/recover-password.component';
import { ChangePasswordComponent } from './pages/external/change-password/change-password.component';

import { HttpClientModule } from '@angular/common/http';
import { PagesModule } from './pages/pages.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        NoPageFoundComponent,
		RecoverPasswordComponent,
		ChangePasswordComponent
    ],
    imports: [
        BrowserModule,
        FontAwesomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule,
        AppRoutingModule,
        PagesModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
