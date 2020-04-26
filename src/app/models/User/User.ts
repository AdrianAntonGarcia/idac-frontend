export class User {
    constructor(
        public email?: string,
        public password?: string,
        public nombre?: string,
        public codigo?: string,
        public role?: string,
        public img?: string,
        public google?: boolean,
        public setupPure?: boolean,
        public setupVrs?: boolean,
        public setupCraig?: boolean,
        public activo?: boolean,
        public id?: string
    ) { }
}
