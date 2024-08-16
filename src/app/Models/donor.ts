export class DonorInfo {
  constructor(
    public id:number,
    public name: string,
    public email: string,
    public password: string,
    public confirmPassword: string,
    public contact: string,
    public gender: string,
    public dob: string,
    public bloodgroup: 'A+' | 'A-' |'B+' | 'B-'|'AB+' | 'AB-'|'O+' | 'O-',
    public medical_history: string,
    public unit: number, //----
    public requestedDate: string, //----
    public created_at: string,
    public updated_at: string,
    public status: string, //---
    public city: string,
    public country: string,
    public address: string
  ) {
  }
}