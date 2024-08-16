import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { BehaviorSubject, catchError, throwError, retry } from 'rxjs'
import { User } from '../Models/user'
import { DonorInfo } from '../Models/donor'
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseAuthUrl = 'http://localhost:8080/api/v2'
  httpOptions: any = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    }),
  }
  httpregOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  }
  isLogged = new BehaviorSubject<boolean>(this.isLoggedIn())
  UserName = new BehaviorSubject<string | null>(
    localStorage.getItem('userName'),
  )
  role = new BehaviorSubject<string | null>(
    localStorage.getItem('role'),
  )
  result: any
  valid: boolean = false

  constructor(private http: HttpClient) { }


  getAllUsers() {
    return this.http.get<User[]>(`${this.baseAuthUrl}/users/all`)
  }

  register(user: User) {
    return this.http
      .post('https://58196afff7f741a58e667a248efed4f4.api.mockbin.io/', user, this.httpregOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  doLogin(user: User) {
    return this.http.post('https://c7bc3800d05e4e208717ec7774fb0773.api.mockbin.io/', user)
  }

  validateToken() {
    let header = new HttpHeaders();
    header.set("Authorization", `Bearer ${this.getToken()}`)
    return this.http.post(
      `${this.baseAuthUrl}/authenticate`,
      header,
    )
  }

  getUser(email: string = "") {
    let donorsData = JSON.parse(localStorage.getItem("donorsList") || "[]");
    let currentUserEmail = email;
    if(email === "") {
      currentUserEmail = localStorage.getItem('email') || "";
    }
    if (donorsData === null || !donorsData.length || currentUserEmail === null || currentUserEmail === '') {
      return []
    } else {
      return donorsData.filter((item: DonorInfo) => item.email == currentUserEmail)
    }
  }

  getAllDonors() {
    let donorsData = JSON.parse(localStorage.getItem("donorsList") || "[]");
    if (donorsData === null || !donorsData.length) {
      return []
    } else {
      return donorsData;
    }
  }

  changeUserPassword(user: User) {
    return this.http
      .put<User>(`${this.baseAuthUrl}/users/`, user, httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  //for login user
  loginUser(token: string, email: string, userName: string, password: string, role: string) {
    this.isLogged.next(true)
    localStorage.setItem('isLogged', '1')
    localStorage.setItem('token', token)
    localStorage.setItem('email', email)
    localStorage.setItem('userName', userName)
    localStorage.setItem('password', password)
    localStorage.setItem('role', role)
    return true
  }

  isLoggedIn() {
    let token = localStorage.getItem('token')
    if (token == undefined || token == null || token == '') {
      this.valid = false;
    } else {
      let decodedToken = this.parseJwtToken(token);
      console.log("yaha aaya", decodedToken);
      if (new Date() < new Date(decodedToken.expired)) {
        // set the value to true if token is not expired
        this.valid = true;
      } else {
        // set the value to false if the token has expired
        this.valid = false
      }
    }
    return this.valid;
  }

  logout() {
    this.isLogged.next(false)
    localStorage.setItem('isLogged', '0')
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('userName')
    localStorage.removeItem('password')
    localStorage.removeItem('role')
    return true
  }

  getToken() {
    return localStorage.getItem('token')
  }

  get loggedInStatus() {
    return this.isLogged.asObservable()
  }

  get currentUserName() {
    return this.UserName.asObservable()
  }
  get Role() {
    return this.role.asObservable()
  }

  parseJwtToken(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  addUserToLocalStorage(payload: any) {
    let existingUsers = JSON.parse(localStorage.getItem("donorsList") || "[]")

    let donorData: DonorInfo = {
      id: 123,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      confirmPassword: payload.confirmPassword,
      contact: payload.contact,
      gender: payload.gender,
      dob: payload.dob,
      bloodgroup: payload.blood,
      medical_history: payload.medical_history,
      unit: 0,
      requestedDate: "",
      created_at: payload.created_at,
      updated_at: payload.updated_at,
      status: "",
      city: payload.city,
      country: payload.country,
      address: payload.address
    }

    if (existingUsers === null || !existingUsers.length) {
      this.updateDonorsDetails([donorData])
    } else {
      existingUsers = [
        ...existingUsers,
        {
          ...donorData,
          id: existingUsers[existingUsers.length - 1].id + 1
        }
      ]
      this.updateDonorsDetails(existingUsers)
    }
  }

  updateDonorsDetails(payload: DonorInfo[]){
    localStorage.setItem("donorsList",JSON.stringify(payload));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error)
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error,
      )
    }
    // Return an observable with a user-facing error message.
    if (error.status === 409) {
      return throwError(
        () => new Error('This email is already registered, Try signing in'),
      )
    } else {
      return throwError(
        () => new Error('Something went bad ! Please try again after sometime'),
      )
    }
  }

  setAdmin(){
    localStorage.setItem("adminList", JSON.stringify([
      {
        "id": 123,
        "name": "Admin",
        "email": "admin@gmail.com",
        "password": "Test@123",
        "confirmPassword": "Test@123",
        "contact": "08004367180",
        "gender": "male",
        "dob": "08-08-2024",
        "bloodgroup": "O+",
        "medical_history": "None",
        "unit": "2",
        "role" : "admin",
        "requestedDate": "2024-08-30T18:30:00.000Z",
        "created_at": "2024-08-16T03:44:37.158Z",
        "updated_at": "2024-08-16T03:44:37.158Z",
        "status": "Accepted",
        "city": "MAUNATH BHANJAN",
        "country": "India",
        "address": "D/13, Power House Colony, Nizzamuddinpura"
      }
    ]))
  }

  validateAdmin(email: string, password: string) {
    let adminData = JSON.parse(localStorage.getItem("adminList") || "[]")

    if(adminData === null || !adminData.length) {
      return {
        "success" : false,
        "message" : "Admin not found"
      }
    } else {
      if(adminData[0].email === email && adminData[0].password === password) {
        return {
          "success" : true,
          "message" : "Logged In",
          "auth_token" : "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJleHBpcmVkIjoiMjAyNi0wOC0xNFQxMDozMTozNi43MjBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDgtMTZUMDM6NDQ6MzcuMTU4WiIsIm5hbWUiOiJBZG1pbiIsImNyZWF0ZWRfYXQiOiIyMDI0LTA4LTE2VDAzOjQ0OjM3LjE1OFoiLCJpc3N1ZXIiOiJSaXRpY2siLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.EhcxHSSGjBk9BcxWcQMCTCttg7ajkTK4EmZP0X08UL4",
          "user_details" : adminData[0]
        }
      } else {
        return {
          "success" : false,
          "message" : "Password not matched"
        }
      }
    }
  }
}