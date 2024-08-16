import { Component, OnInit } from '@angular/core';
import { DonorInfo } from 'src/app/Models/donor';
import { BloodRequestType, Hospital } from 'src/app/Models/hospital';
import { HospitalService } from 'src/app/Services/hospital.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  loading: boolean;
  totalDonorCount: number;
  totalHospitalRequestCount: number;
  totalHospitalApprovedRequestCount: number
  totalBloodUnitReceivedCount: number;
  totalBloodUnitRemainingCount: number;

  bloodCollection = {
    'A+': {
      received: 0,
      remaining: 0
    },
    'A-': {
      received: 0,
      remaining: 0
    },
    'B+': {
      received: 0,
      remaining: 0
    },
    'B-': {
      received: 0,
      remaining: 0
    },
    'AB+': {
      received: 0,
      remaining: 0
    },
    'AB-': {
      received: 0,
      remaining: 0
    },
    'O+': {
      received: 0,
      remaining: 0
    },
    'O-': {
      received: 0,
      remaining: 0
    },
  }
  constructor(
    private userService: UserService,
    private hospitalServive: HospitalService
  ) {
    this.loading = true;
    this.totalDonorCount = 0
    this.totalHospitalRequestCount = 0
    this.totalHospitalApprovedRequestCount = 0
    this.totalBloodUnitReceivedCount = 0
    this.totalBloodUnitRemainingCount = 0
  }

  ngOnInit(): void {
    this.getBloodData()
  }

  getBloodData() {
    // handle donation records data
    let donorsData = this.userService.getAllDonors();
    donorsData.map((items: DonorInfo) => {
      if (items.status === "Accepted") {
        this.bloodCollection = {
          ...this.bloodCollection,
          [items.bloodgroup]: {
            received : this.bloodCollection[items.bloodgroup].received + Number(items.unit),
            remaining : this.bloodCollection[items.bloodgroup].received + Number(items.unit)
          }
        }
        this.totalDonorCount = this.totalDonorCount + 1;
        this.totalBloodUnitReceivedCount = this.totalBloodUnitReceivedCount + Number(this.bloodCollection[items.bloodgroup].received)
      }
    })

    this.totalBloodUnitRemainingCount = this.totalBloodUnitReceivedCount
    // handle hospital record data
    let hospitalData = this.hospitalServive.getAllHospitalData();
    hospitalData.map((items: Hospital) => {
      if (items.bloodRequests) {
        items.bloodRequests.length && items.bloodRequests.map((request: BloodRequestType) => {
          if (request.status === "Accepted") {
            this.bloodCollection = {
              ...this.bloodCollection,
              [request.bloodGroup]:  {
                ...this.bloodCollection[request.bloodGroup],
                remaining : this.bloodCollection[request.bloodGroup].received - request.unitsRequested
              }
            }
            this.totalHospitalApprovedRequestCount += 1
            this.totalBloodUnitRemainingCount = this.totalBloodUnitRemainingCount - request.unitsRequested
          }
          this.totalHospitalRequestCount += 1;
        })
      }
    })
  }
}
