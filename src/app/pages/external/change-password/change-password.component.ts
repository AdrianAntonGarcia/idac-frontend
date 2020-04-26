import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pass } from '../../../models/Pass/Pass';
import { ActivatedRoute } from '@angular/router';
import { RecoverPassService } from '../../../services/recover-pass.service';

declare function init_plugins();
@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

    formChange: FormGroup;
    token: string;
    email: string;

    constructor(
        private recoverPassService: RecoverPassService,
        private activatedRoute: ActivatedRoute
    ) {
        this.token = activatedRoute.snapshot.paramMap.get('token');
        console.log(this.token);
        this.comprobarToken(this.token);
    }

    async comprobarToken(token: string) {
        await this.recoverPassService.checkToken(token).subscribe((usuario) => {
            // console.log('Usuario validado', usuario);
            this.email = usuario.email;
        });
    }

    ngOnInit(): void {
        init_plugins();
        this.formChange = new FormGroup({
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            password2: new FormControl(null, [Validators.required, Validators.minLength(6)])
        }, { validators: this.sonIguales('password', 'password2') });
    }

    /**
     * Función que cambia la contraseña del usuario llamando al servicio de actualización
     */
    cambiarContra() {
        console.log(this.formChange);
        if (this.formChange.invalid) {
            Swal.fire('Datos incorrectos', 'Revise los datos introducidos', 'error');
            return;
        }

        const pass = new Pass(
            this.formChange.value.password,
        );

        this.recoverPassService.cambiarContra(this.email, this.formChange.value.password, this.token).subscribe((resp) => {

        });
        // this.userService.crearUsuario(usuario).subscribe(resp => {
        //     this.router.navigate(['/login']);
        // });
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
