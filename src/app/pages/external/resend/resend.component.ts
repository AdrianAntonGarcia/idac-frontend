import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Pass } from '../../../models/Pass/Pass';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RecoverPassService } from '../../../services/recover-pass.service';

declare function init_plugins();
@Component({
    selector: 'app-resend',
    templateUrl: './resend.component.html',
    styleUrls: ['./resend.component.scss']
})
export class ResendComponent implements OnInit {

    formResend: FormGroup;

    email: string;

    constructor(
        private recoverPassService: RecoverPassService,
    ) {
    }

    async comprobarToken(token: string) {

    }

    ngOnInit(): void {
        init_plugins();
        this.formResend = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    /**
     * Función que cambia la contraseña del usuario llamando al servicio de actualización
     */
    reenviarEmail() {
        console.log(this.formResend);
        if (this.formResend.invalid) {
            Swal.fire('Datos incorrectos', 'Revise los datos introducidos', 'error');
            return;
        }
        console.log(this.formResend.value.email);
        this.recoverPassService.reenviarEmailConfirmacion(this.formResend.value.email).subscribe(resp => {
            console.log(resp);
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
