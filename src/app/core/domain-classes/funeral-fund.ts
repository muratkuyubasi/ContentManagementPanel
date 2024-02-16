export class Member {
    firstName: string;
    lastName: string;
    identificationNumber: string;
    birthPlace: string;
    birthDay: Date;
    gender: string;
    nationalitiy: string;
    spouse: Spouse[];
    familyMembers: FamilyMember[];
    address: Address[];
  }
  
  export class Spouse {
    id:number;
    firstName: string;
    lastName: string;
    identificationNumber: string;
    birthPlace: string;
    birthDay: Date;
    nationalitiy: string;
  }
  
  export class FamilyMember {
    id:string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    identificationNumber: string;
    birthPlace: string;
    birthDay: Date;
    gender: string;
    nationalitiy: string;
  }
  
  export class Address {
    familyId: string;
    street: string;
    postCode: string;
    district: string;
    phoneNumber: string;
    email: string;
  }
  