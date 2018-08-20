import { Appointment } from './appointment';
export class User {
    constructor(
        public name: string= '',
        public email: string= '',
        public appointments: Array<Appointment> =[],
        public password: string= ''

    ){}
}
