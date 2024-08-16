import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../Models/hospital';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
}

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  baseAuthUrl = 'http://localhost:8080/api/v2';
  httpOptions: any = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    }),
  }
  constructor() { }

  getToken() {

  }

  getHospitalData(email: string = "") {
    let hospitalData = JSON.parse(localStorage.getItem("hospitalList") || "[]");
    let currentHospitalEmail = email;
    if(email === "") {
      currentHospitalEmail = localStorage.getItem('email') || "";
    }
    if (hospitalData === null || !hospitalData.length || currentHospitalEmail === null || currentHospitalEmail === '') {
      return []
    } else {
      return hospitalData.filter((item: Hospital) => item.email == currentHospitalEmail)
    }
  }

  getAllHospitalData() {
    let data = JSON.parse(localStorage.getItem('hospitalList') || '[]')

    if (data === null || !data.length) {
      return []
    } else {
      return data;
    }
  }

  updateHospitalData(payload: any) {
    localStorage.setItem("hospitalList", JSON.stringify(payload))
  }

  register(payload: Hospital) {
    let data = JSON.parse(localStorage.getItem('hospitalList') || '[]')
    if (data === null || !data.length) {
      this.updateHospitalData([payload])
    } else {
      data = [
        ...data,
        {
          ...payload,
          id: data[data.length - 1].id + 1
        }
      ]
      this.updateHospitalData(data)
    }
    return {
      "success": true,
      "message": "Added Successfully",
      "auth_token": "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkIjoiMjAyNi0wOC0xNFQxMDozMTozNi43MjBaIiwicm9sZSI6ImRvbm9yIiwibmFtZSI6IlJpdGljayBSYWkiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOC0xNFQxMDozMTozNi43MjBaIiwiaXNzdWVyIjoiUml0aWNrIFJhaSIsImVtYWlsIjoiam9obnlyaXRpY2tAZ21haWwuY29tIn0.p8i6BV30CjFrkoHwvBu8jyTXPfVArXBLkugh5byJiXE"
    }
  }
  
  login(payload : {email: string, password: string, role: string}) {
    const {password, email, role} = payload
    let hospitalData = this.getAllHospitalData()
    let matchedData = hospitalData.filter((item: Hospital) => item.email === email)
    if (matchedData.length) {
      if(password === matchedData[0].password) {
        return {
          "success": true,
          "message": "Hospital Found",
          "auth_token" : 'eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVkIjoiMjAyNi0wOC0xNFQxMDozMTozNi43MjBaIiwicm9sZSI6ImRvbm9yIiwibmFtZSI6IlJpdGljayBSYWkiLCJjcmVhdGVkX2F0IjoiMjAyNC0wOC0xNFQxMDozMTozNi43MjBaIiwiaXNzdWVyIjoiUml0aWNrIFJhaSIsImVtYWlsIjoiam9obnlyaXRpY2tAZ21haWwuY29tIn0.p8i6BV30CjFrkoHwvBu8jyTXPfVArXBLkugh5byJiXE',
          "user_details" : matchedData[0]
        }
      } else {
        return {
          "success": false,
          "message": "Password not matched"
        }
      }
    } else {
      return {
        "success": false,
        "message": "Hospital Not Found"
      }
    }
  }
}