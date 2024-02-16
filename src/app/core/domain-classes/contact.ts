export class Contact {
    id: number;
    neighborhoodOrVillage: string;
    street: string;
    state: string;
    city: string;
    outerDoorNo: string;
    interiorDoorNo: string;
    instutionPhoneNumber: string;
    instutionEmail: string;
    isPlace: boolean;
    contactFiles:ContactFiles[];
}

export class ContactFiles {
    id: number;
    contactId: number;
    fileId: number;
    employeeFile: EmployeeFile[];
}

export class EmployeeFile {
    FileTypeId: number;
    FileName: string;
    FormFile: string;
}
