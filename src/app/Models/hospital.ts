export class Hospital {
    constructor(
        public id: number,
        public name: string,
        public contact: string,
        public email: string,
        public address: string,
        public city: string,
        public country: string,
        public registrationDate: Date,
        public created_at: string,
        public updated_at: string,
        public role?: string,
        public password?: string,
        public bloodRequests?: BloodRequestType[]
    ) { }
}

export interface BloodRequestType {
    requestId: string,
    requestDate: Date,
    bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-',
    disease: string,
    unitsRequested: number,
    unitsGiven: string,
    status: string
}