import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../models/User/User';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    formRegister: FormGroup;

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void {
        init_plugins();
        this.formRegister = new FormGroup({
            codIracing: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
            nombre: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            correo: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            password2: new FormControl(null, [Validators.required, Validators.minLength(6)])
        }, { validators: this.sonIguales('password', 'password2') });
    }

    /**
     * Función que llama al servicio de usuarios para registrar un nuevo
     * piloto en la base de datos, si el usuario es incorrecto sale.
     */
    registrarUsuario() {

        if (this.formRegister.invalid) {
            Swal.fire('Datos incorrectos', 'Revise los datos introducidos', 'error');
            return;
        }

        const usuario = new User(
            this.formRegister.value.correo,
            this.formRegister.value.password,
            this.formRegister.value.nombre,
            this.formRegister.value.codIracing
        );

        this.userService.crearUsuario(usuario).subscribe(resp => {
            this.router.navigate(['/login']);
        });
    }

    /**
     * Validador personalizado, retorna valido si son iguales los textos
     * @param campo1 nombre del primer campo del formulario a comparar
     * @param campo2 nombre del segundo campo del formulario a comparar
     */

    sonIguales(campo1: string, campo2: string) {
        return (group: FormGroup) => {
            const pass1 = group.controls[campo1].value;
            const pass2 = group.controls[campo2].value;

            if (pass1 === pass2) {
                return null;
            }
            return {
                sonIguales: true
            };
        };
    }

}
