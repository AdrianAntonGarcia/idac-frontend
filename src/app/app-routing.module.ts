import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Páginas externas

import { LoginComponent } from './pages/external/login/login.component';
import { RegisterComponent } from './pages/external/register/register.component';
import { NoPageFoundComponent } from './pages/external/no-page-found/no-page-found.component';
import { RecoverPasswordComponent } from './pages/external/recover-password/recover-password.component';
import { ChangePasswordComponent } from './pages/external/change-password/change-password.component';
import { ResendComponent } from './pages/external/resend/resend.component';


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverPasswordComponent },
    { path: 'resend', component: ResendComponent },
    { path: 'changePass/:token', component: ChangePasswordComponent },
    { path: 'pages', loadChildren: './pages/pages.module#PagesModule' },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', component: NoPageFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
