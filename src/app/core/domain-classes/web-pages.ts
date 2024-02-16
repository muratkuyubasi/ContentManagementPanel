
// ------------Menu------------ //
export class FrontMenuRecords {
    id: number
    frontMenuId: number
    name?: string
    slug: string
    languageCode: string

    

}

export class FrontMenu {
    id: number
    code: string
    order: string
    url: string
    isActive: boolean
    parentId: number 
    frontPageId:number
    frontPage:FrontPage[]
    frontMenuRecords: FrontMenuRecords[]
}


// ------------Page------------ //
export class FrontPage {
    id: number
    code: string
    isActive: boolean
    frontGalleryId: number
    frontPageRecords: FrontPageRecords[]

}

export class FrontPageRecords {
    id: number
    code: string
    name: string
    frontPageId: number
    pageContent: string
    languageCode: string
    fileUrl: string
}

// ------------Announcement------------ //
export class Announcement {
    id: Number
    code:string
    order: Number
    isSlider: boolean
    isNews: boolean
    isAnnouncement: boolean
    isActive: boolean
    frontAnnouncementRecords: FrontAnnouncementRecords[]
}

export class FrontAnnouncementRecords {
    id: Number
    code:string
    title: string
    shortDescription: string
    longDescription: string
    fileUrl: string
    languageCode: string

}
// ------------Mosques------------ //

export class Mosque {
    image: string;
    name: string;
    state: boolean;
    address: string;
    phoneNumber: string;
    ownership: string;
    officersCount: number;
    imamFullName: string;
    group: string;
    lodgingCount: number;
    capacity: number;
    explanationAboutMosque: string;
    openingDate: Date;
}

// ------------Activity (Faaliyetler)------------ //
export class Activity {
    id: number;
    title: string;
    description: string;
    isActive: boolean;
}

// ------------Clergy------------ //
export class Clergy {
    id: number;
    image: string;
    name: string;
    surname: string;
    jobDescription: string;
    placeOfDuty: string;
  }

// ------------Service (Hizmetler)------------ //
export class Service {
    id: number;
    title: string;
    description: string;
    isActive: boolean;
  }

  // ------------Foundation Publication (Vakıf Yayınları)------------ //

  export class FoundationPublication {
    id:number;
    image:string;
    name:string;
    subtitle:string;
    description:string;
  }


// ------------Airports - Association - Room Types (Hajj Umrah Application)------------ //
export class Airports {
    id: Number
    name: string
}

export class Associations {
    id: Number
    name: string
}

export class RoomTypes {
    id: Number
    roomTypes: string
}