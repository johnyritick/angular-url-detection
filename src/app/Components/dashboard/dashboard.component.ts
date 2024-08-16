import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DonorInfo } from 'src/app/Models/donor';
import { Hospital } from 'src/app/Models/hospital';
import { HospitalService } from 'src/app/Services/hospital.service';
import { UserService } from 'src/app/Services/user.service';


interface SelectInput {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit {
  loading: boolean = true;
  enableDonorFormEdit: boolean;
  enableAdminFormEdit: boolean;
  enableHospitalFormEdit: boolean;
  currentUser: any = {};

  donorProfileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        ),
      ],
    ],
    contact: ['', [Validators.required]],
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    bloodgroup: ['', [Validators.required]],
    medical_history: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required]]
  })

  hospitalProfileForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/,
        ),
      ],
    ],
    contact: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required]]
  })

  gender: SelectInput[] = [
    { value: 'male', viewValue: 'Male' },
    { value: 'female', viewValue: 'Female' },
    { value: 'others', viewValue: 'Others' },
  ];

  bloodGroups: SelectInput[] = [
    { value: 'A+', viewValue: 'A Positive' },
    { value: 'A-', viewValue: 'A Negative' },
    { value: 'B+', viewValue: 'B Positive' },
    { value: 'B-', viewValue: 'B Negative' },
    { value: 'AB+', viewValue: 'AB Positive' },
    { value: 'AB-', viewValue: 'AB Negative' },
    { value: 'O+', viewValue: 'O Positive' },
    { value: 'O-', viewValue: 'O Negative' }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private hospitalService: HospitalService
  ) {
    this.enableDonorFormEdit = false
    this.enableAdminFormEdit = false
    this.enableHospitalFormEdit = false
  }

  ngOnInit(): void {
    this.loading = false
    this.getCurrentUserDetails()
  }

  updateDetails() {
    if (this.currentUser.role === 'donor') {
      this.updateHospitalInfo()
    } else if (this.currentUser.role === 'hospital') {
      this.updateDonorInfo()
    }
  }

  updateHospitalInfo() {
    let formData = this.hospitalProfileForm.value;
    let hospitalList = this.hospitalService.getAllHospitalData()
    let matchingIndex = hospitalList.findIndex((items: Hospital) => items.email === this.currentUser.email)

    let updatedData = {
      ...hospitalList[matchingIndex],
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      medical_history: formData.medical_history,
      city: formData.city,
      country: formData.country,
      address: formData.address
    }

    hospitalList = [
      ...hospitalList.slice(0, matchingIndex),
      { ...updatedData },
      ...hospitalList.slice(matchingIndex + 1)
    ]

    this.currentUser = updatedData

    this.hospitalService.updateHospitalData(hospitalList)
  }

  updateDonorInfo() {
    let formData = this.donorProfileForm.value;
    let donorsList = this.userService.getAllDonors()
    let matchingIndex = donorsList.findIndex((items: DonorInfo) => items.email === this.currentUser.email)

    let updatedData = {
      ...donorsList[matchingIndex],
      name: formData.name,
      email: formData.email,
      password: formData.password,
      contact: formData.contact,
      gender: formData.gender,
      dob: formData.dob,
      bloodgroup: formData.bloodgroup,
      medical_history: formData.medical_history,
      city: formData.city,
      country: formData.country,
      address: formData.address,
    }
    donorsList = [
      ...donorsList.slice(0, matchingIndex),
      { ...updatedData },
      ...donorsList.slice(matchingIndex + 1)
    ]

    this.currentUser = updatedData

    this.userService.updateDonorsDetails(donorsList)
  }

  openEditForm() {
    if (this.currentUser.role === 'donor') {
      this.enableDonorFormEdit = true;
    } else if (this.currentUser.role === 'hospital') {
      this.enableHospitalFormEdit = true
    }
  }

  getCurrentUserDetails() {
    
    let role = localStorage.getItem("role")

    if (role === "donor") {
      this.currentUser = this.userService.getUser()[0]
      console.log("role", this.currentUser);
    } else if (role === "hospital") {
      this.currentUser = this.hospitalService.getHospitalData()[0]
    } else if (role === "admin") {
      this.currentUser = (JSON.parse(localStorage.getItem("adminList") || "[]"))[0]
    }
  }

}
