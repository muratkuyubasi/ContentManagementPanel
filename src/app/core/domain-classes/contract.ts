import { EmployeeFile } from "./contact"

export class Contract {
    code:any
    contractType: ContractType[];
    description: string
    contractStartDate: Date
    contractEndDate: Date
    employeeId: number
    employeeFile: EmployeeFile[];
}

export enum ContractType {
    Temp = 'Geçici',
    Permanent = 'Kalıcı',
    Privacy = 'Gizlilik',
    Part = 'Yarı Zamanlı',
    Debit = 'Zimmet'
}