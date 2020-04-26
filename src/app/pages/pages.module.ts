/**
 * Angular
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * Modulos de rutas
 */

import { PagesRoutingModule } from './pages-routing.module';

/**
 * Páginas de la web
 */

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResendComponent } from './external/resend/resend.component';




@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ResendComponent
    ],
    imports: [
        PagesRoutingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})

export class PagesModule { }
