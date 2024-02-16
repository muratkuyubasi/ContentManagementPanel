import { EmployeeFile } from '@core/domain-classes/contact';
import { Contact, ContactFiles } from './contact';

export interface Employee {
    id:number;
    code: string;
    identificationNumber: string;
    passportNumber: string;
    firstName: string;
    middleName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    phoneNumber: string;
    email: string;
    gender: Gender;
    birthDay: Date;
    userId: string;
    contactId: number;
    contact: Contact[];
    isActive: boolean;
}
export enum Gender {
    Male = 'Erkek',
    Female = 'Kadın'
}