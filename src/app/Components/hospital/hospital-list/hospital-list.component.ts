import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../../Models/hospital';
import { DatePipe } from '@angular/common';
import { HospitalService } from 'src/app/Services/hospital.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'hospital-list',
  templateUrl: './hospital-list.component.html',
  styleUrls: ['./hospital-list.component.css'],
  providers: [DatePipe]
})
export class HospitalListComponent implements OnInit {
  dataSource: Hospital[] = []
  allDataSource: Hospital[] = []
  loading: boolean = true
  displayedColumns: string[] = [
    'id', 'name',
    'disease', 'contact',
    'city',
    'requestDate',
    'bloodGroup',
    'unitsRequested',
    'status',
    'actions',
  ];

  paginationData = {
    "previousPageIndex": 0,
    "pageIndex": 0,
    "pageSize": 10,
    "length": 0
  }

  openProfileModal: boolean = false
  individualProfileData: any = {}

  constructor(
    private datePipe: DatePipe,
    private hospitalService: HospitalService,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getHospitalsList()
  }

  getHospitalsList() {
    let hospitalData = JSON.parse(localStorage.getItem("hospitalList") || '[]');
    setTimeout(() => {
      const structuredData = this.transformHospitalData(hospitalData);
      let skipFrom = this.paginationData.pageIndex * this.paginationData.pageSize
    let skipUpto = (this.paginationData.pageIndex * this.paginationData.pageSize) + this.paginationData.pageSize
    this.paginationData.length = structuredData.length % this.paginationData.pageSize === 0 ? structuredData.length / this.paginationData.pageSize : (structuredData.length / this.paginationData.pageSize) + 1
      this.dataSource = structuredData.length ? structuredData.slice(skipFrom, skipUpto) : []
      this.loading = false
    }, 2000)
  }

  transformHospitalData(hospitals: any) {
    return hospitals.flatMap((hospital: any) =>
      hospital.bloodRequests.length ? hospital.bloodRequests.map((request: any) => ({
        id: hospital.id,
        name: hospital.name,
        contact: hospital.contact,
        city: hospital.city,
        disease: request.disease,
        registrationDate: hospital.created_at,
        requestDate: request.requestDate,
        sub_id: request.id,
        bloodGroup: request.bloodGroup,
        unitsRequested: request.unitsRequested,
        unitsGiven: request.unitsGiven,
        status: request.status
      })) : {
        id: hospital.id,
        name: hospital.name,
        contact: hospital.contact,
        city: hospital.city,
        sub_id: "",
        disease: "NA",
        registrationDate: hospital.created_at,
        requestDate: "NA",
        bloodGroup: "NA",
        unitsRequested: "NA",
        unitsGiven: "NA",
        status: ""
      }

    );
  }

  getMatchingData(text: string) {

  }

  updateHospitalStatus(id: string, sub_id: string, status: string) {
    let hospitalList = this.hospitalService.getAllHospitalData()
    let hospitalDataIndex = hospitalList.findIndex((item: Hospital) => item.id === +id)

    if (hospitalDataIndex !== -1) {
      // fetch sub_id from blood Request arr
      let subIdIndex = hospitalList[hospitalDataIndex].bloodRequests.findIndex((item: any) => item.id == Number(sub_id))
      let updatedArr = {}
      if (subIdIndex !== -1) {
        console.log("oen",subIdIndex,hospitalList[hospitalDataIndex]);
        updatedArr = {
          ...hospitalList[hospitalDataIndex],   // spread the hospital data
          bloodRequests: [
            ...hospitalList[hospitalDataIndex].bloodRequests.slice(0, subIdIndex),
            {
              ...hospitalList[hospitalDataIndex].bloodRequests[subIdIndex],
              unitsGiven: hospitalList[hospitalDataIndex].bloodRequests[subIdIndex].unitsRequested,    // prepare the updated data
              "status": status
            },
            ...hospitalList[hospitalDataIndex].bloodRequests.slice(subIdIndex + 1)
          ]
        }
      }

      // now preparing data for global hospital list
      hospitalList = [
        ...hospitalList.slice(0, hospitalDataIndex),
        { ...updatedArr },    // set the updated hospital data
        ...hospitalList.slice(hospitalDataIndex + 1)
      ];

      this.hospitalService.updateHospitalData(hospitalList)
      
      const structuredData = this.transformHospitalData(hospitalList)
      this.dataSource = structuredData.length ? structuredData : []
    } else {
      this.openSnackBar("Record Not Found", 'Ok', true)
    }

  }

  viewIndividualDetails(id: string) {

  }

  formatDate(date: string) {
    return this.datePipe.transform(new Date(), 'dd-MM-yyyy')
  }

  onPageChange(event: any) {
    this.loading = true;
    this.paginationData = event

    //this will update the number of rows in table
    this.getHospitalsList()
  }


  openSnackBar(message: string, action: string, isSuccess: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
    })
  }
}
