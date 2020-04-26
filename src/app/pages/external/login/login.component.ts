import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/User/User';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formLogin: FormGroup;

    email: string = '';
    recuerdame: boolean = false;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        init_plugins();
        this.email = localStorage.getItem('emailIdac') || '';
        console.log(this.email);
        if (this.email.length > 1) {
            this.recuerdame = true;
        }
        this.formLogin = new FormGroup({
            email: new FormControl(null, Validators.required),
            password: new FormControl(null, Validators.required),
            remember: new FormControl(null),
        });
    }

    loginUsuario() {
        console.log(this.formLogin.value.email);
        console.log(this.formLogin.value.password);
        console.log(this.formLogin.value.remember);
        console.log(this.formLogin.valid);

        let recordar: boolean = false;
        if (this.formLogin.valid === false) {

            return;
        }
        const usuarioLogin: User = new User(
            this.formLogin.value.email,
            this.formLogin.value.password
        );
        if (this.formLogin.value.remember === undefined) {
            recordar = false;
        } else {
            recordar = this.formLogin.value.remember;
        }
        console.log('entro');
        this.userService.loginUsuario(usuarioLogin, recordar).subscribe(() => {
            this.router.navigate(['/pages']);
        });
    }
}
