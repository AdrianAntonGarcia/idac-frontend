import { Injectable } from '@angular/core';
import { User } from '../models/User/User';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    usuario: User;
    token: string;
    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.cargarStorage();
    }


    crearUsuario(usuario: User) {
        const url = URL_SERVICIOS + '/usuario';
        return this.http.post(url, usuario).pipe(map((resp: any) => {
            Swal.fire('Usuario registrado', resp.message, 'success');
            return resp.usuario;
        }), catchError((err) => {
            console.log(err);
            Swal.fire('Error al registrar usuario', err.error.errors.message, 'error');
            return throwError(err);
        })
        );
    }

    /**
     * Función que a través de los parámetros de login que le llega intenta realizar el login del usuario
     * obteniendo el token y los datos de ese usuario. Llamará a la función guardarStorage para almacenar
     * los datos del usuario en el servicio.
     * @param usuario usuario con el email y contraseñas introducidos por el usuario para el login
     */

    loginUsuario(usuario: User, recordar: boolean = false) {
        const url = URL_SERVICIOS + '/login';
        /**
         * Guardamos el email si el usuario ha selccionado el recuerdame
         */
        if (recordar) {
            localStorage.setItem('emailIdac', usuario.email);
        } else {
            localStorage.removeItem('emailIdac');
        }
        console.log('entro');
        return this.http.post(url, usuario).pipe(map((resp: any) => {
            // Swal.fire('Usuario logueado', 'Usuario autenticado correctamente', 'success');
            console.log(resp);
            const userResp: User = new User(
                resp.usuario.email,
                resp.usuario.password,
                resp.usuario.nombre,
                resp.usuario.cod_iracing.codigo,
                resp.usuario.role,
                resp.usuario.img,
                resp.usuario.google,
                resp.usuario.setup_pure,
                resp.usuario.setup_vrs,
                resp.usuario.setup_craig,
                resp.usuario.activo,
                resp.usuario._id
            );
            this.guardarStorage(resp.usuario._id, resp.token, userResp);
            return userResp;
        }), catchError((err) => {
            Swal.fire('Error en el login', err.error.message, 'error');
            return throwError(err);
        })
        );
    }

    /**
     * Función que carga los datos del usuario en el servicio a partir del local
     * storage del navegador del usuario
     */

    cargarStorage() {
        if (localStorage.getItem('tokenIdac')) {
            this.token = localStorage.getItem('tokenIdac');
            this.usuario = JSON.parse(localStorage.getItem('usuarioIdac'));
        } else {
            this.token = '';
            this.usuario = null;
        }
    }

    /**
     * Función que almacena en el local storage toda la información del usuario
     * @param id id del usuario
     * @param token token del usuario
     * @param usuario datos del usuario
     */

    guardarStorage(id: string, token: string, usuario: User) {

        localStorage.setItem('idIdac', id);
        localStorage.setItem('tokenIdac', token);
        /**
         * No podemos guardar en el local storage un objeto, por lo que
         * hay que transformarlo a string.
         */
        localStorage.setItem('usuarioIdac', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
    }

    /**
     * Función que limpia el local storage para sacar al usuario
     */
    logout() {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('tokenIdac');
        localStorage.removeItem('usuarioIdac');
        localStorage.removeItem('idIdac');
        this.router.navigate(['/login']);
    }
}
