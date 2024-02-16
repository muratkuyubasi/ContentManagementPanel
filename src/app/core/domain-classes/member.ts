export class Member {
    firstName: string
    lastName: string
    identificationNumber: string
    birthPlace: string
    birthDay: Date
    gender: string
    nationalitiy: string
    familyMembers: FamilyMembers[]
    address:Address[]
}

export class FamilyMembers {
    id: string
    firstName: string
    lastName: string
    identificationNumber: string
    birthPlace: string
    birthDay: Date
    sex: string
    nationalitiy: string
}

export class Address {
    familyId: string
    street: string
    postCode: string
    district: string
    phoneNumber: string
    email: string
}


