import { Component, OnInit } from '@angular/core';
import { RecoverPassService } from '../../../services/recover-pass.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


declare function init_plugins();
@Component({
    selector: 'app-recover-password',
    templateUrl: './recover-password.component.html',
    styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

    formRecover: FormGroup;

    constructor(
        private recoverPassService: RecoverPassService,
        private router: Router
    ) { }

    ngOnInit(): void {
        init_plugins();
        this.formRecover = new FormGroup({
            email: new FormControl(null, [Validators.required, Validators.email])
        });
    }

    /**
     * Función que llama al servicio de recuperación para enviar el email de recuperación de la contraseña
     */

    enviarEmailConfirmacion() {
        this.recoverPassService.enviarEmailConfirmacion(this.formRecover.value.email).subscribe(resp => {
            this.router.navigate(['/login']);
        });
    }
}
