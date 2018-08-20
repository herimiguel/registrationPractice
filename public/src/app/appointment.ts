import {User} from './user';

export class Appointment {
    constructor(
        public  patient = 0,
        public complaint: string = '',
        public datetime = new Date()
    ){}
}
