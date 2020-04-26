import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/config/config';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class RecoverPassService {



    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    /**
     * Función que cambia la contraseña del usuario
     * @param email email del usuario a modificar
     * @param nuevaPass nueva contraseña del usuario
     */

    cambiarContra(email: string, nuevaPass: string, token: string) {
        let url = URL_SERVICIOS + '/recover/changePass';
        url = url + '?token=' + token;
        return this.http.post(url, { email, password: nuevaPass }).pipe(
            map((resp: any) => {
                Swal.fire('Contraseña cambiada', 'Contraseña cambiada correctamente', 'success');
                this.router.navigate(['/login']);
                return resp.usuario;
            }), catchError((err) => {
                Swal.fire('Error cambiando contraseña', 'Reintente:' + err.message, 'error');
                return throwError(err);
            })
        )
    }

    /**
     * Servicio que envía el email para reestablecer la contraseña al usuario
     * @param email email al que enviar el correo
     */

    enviarEmailConfirmacion(email: string) {
        const url = URL_SERVICIOS + '/recover/recover';
        console.log(email);
        return this.http.post(url, { email }).pipe(map((resp: any) => {
            Swal.fire('Email enviado', 'Comprueba tu email para reestablecer la contraseña', 'success');
        }), catchError((err) => {

            Swal.fire('Error en el envio del email', err.error.message, 'error');
            return throwError(err.message);
        })
        );
    }

    /**
     * Servicio que reenvía el email de confirmación para activar la cuenta del usuario
     * @param email email al que reenviar la confirmación
     */

    reenviarEmailConfirmacion(email: string) {
        const url = URL_SERVICIOS + '/recover/resendEmail';
        console.log(email);
        return this.http.post(url, { email }).pipe(map((resp: any) => {
            Swal.fire('Email de confirmación enviado', 'Comprueba tu email para activar tu cuenta', 'success');
        }), catchError((err) => {
            console.log(err);
            Swal.fire('Error en el envio del email', err.error.message, 'error');
            return throwError(err.message);
        })
        );
    }


    /**
     * Función que comprueba que el token introducido sea correcto, si no lo es nos devuelve al login
     * @param token token a comprobar
     */
    checkToken(token: string) {
        let url = URL_SERVICIOS + '/recover';
        url = url + '/checkToken/' + token;
        return this.http.get(url).pipe(map((resp: any) => {
            // Swal.fire('Usuario validado', resp.message, 'success');
            return resp.usuario;
        }), catchError((err) => {
            console.log(err);
            Swal.fire('Error al comprobar token', err.error.errors.message, 'error');
            this.router.navigate(['/login']);
            return throwError(err);
        })
        );
    }
}
