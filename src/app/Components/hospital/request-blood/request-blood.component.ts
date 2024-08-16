import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Hospital } from 'src/app/Models/hospital';
import { HospitalService } from 'src/app/Services/hospital.service';
import { UserService } from 'src/app/Services/user.service';

interface SelectInput {
  viewValue: string,
  value: string
}

@Component({
  selector: 'request-blood',
  templateUrl: './request-blood.component.html',
  styleUrls: ['./request-blood.component.css'],
  providers: [DatePipe]
})
export class RequestBloodComponent implements OnInit {
  currentUser: Hospital = {
    id: 1,
    name: '',
    contact: '',
    email: '',
    address: '',
    city: '',
    country: '',
    created_at: '',
    updated_at: '',
    registrationDate: new Date(),
    bloodRequests: []
  }
  loading: boolean = true;
  formSubmissionStatus: boolean;
  showAppointmentForm: boolean;
  minDate = new Date();

  historyRecords: Hospital[] = []
  allHistoryRecords: Hospital[] = []

  displayedColumns: string[] = [
    'id', 'requestDate',
    'bloodGroup', 'disease',
    'unitsRequested',
    'requestDate',
    'bloodGroup',
    'unitsGiven',
    'status',
  ];

  bloodRequirementForm = this.fb.group({
    bloodgroup: ['', [Validators.required]],
    unit: ['', [Validators.required]],
    medical_history: ['', [Validators.required]]
  })

  bloodUnits: SelectInput[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
    { value: '8', viewValue: '8' },
    { value: '10', viewValue: '10' },
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
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private hospitalService: HospitalService,
    private datePipe: DatePipe,
  ) {
    this.currentUser = this.hospitalService.getHospitalData()[0];
    console.log("this", this.currentUser);

    this.formSubmissionStatus = false

    this.showAppointmentForm = true

  }

  ngOnInit(): void {
    this.loading = false
  }

  registerRequest() {
    console.log("register",this.bloodRequirementForm.value, this.currentUser)
    let hospitalList = this.hospitalService.getAllHospitalData();
    // Find the index of the object with the specified ID
    const hospitalDataIndex = hospitalList.findIndex((obj: Hospital) => obj.id === this.currentUser.id);

    if (hospitalDataIndex !== -1) {
      console.log("mar",hospitalList,hospitalList[hospitalDataIndex].bloodRequests);
      
      let updatedArr = {
        ...hospitalList[hospitalDataIndex],
        bloodRequests: [
          ...hospitalList[hospitalDataIndex].bloodRequests,
          {
            id: hospitalList[hospitalDataIndex].bloodRequests.length ? hospitalList[hospitalDataIndex].bloodRequests[hospitalList[hospitalDataIndex].bloodRequests?.length - 1]?.id + 1 : 1,
            requestDate: new Date(),
            bloodGroup: this.bloodRequirementForm.value.bloodgroup,
            disease: this.bloodRequirementForm.value.medical_history,
            unitsRequested: this.bloodRequirementForm.value.unit,
            unitsGiven: '0',
            status: ''
          }]
      }
      hospitalList = [
        ...hospitalList.slice(0, hospitalDataIndex),
        { ...updatedArr },
        ...hospitalList.slice(hospitalDataIndex + 1)
      ];

      // update the details into local storage
      this.hospitalService.updateHospitalData(hospitalList)

      this.currentUser = updatedArr

      // reset form value
      this.bloodRequirementForm.reset()

      this.formSubmissionStatus = true
      this.showAppointmentForm = false
      setTimeout(() => {
        this.formSubmissionStatus = false
      }, 5000)
    } else {
      // Show snack bar
      this.openSnackBar("User not found", 'Close')
    }
  }

  openSnackBar(message: string, action: string, isSuccess: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
    })
  }

  convertDate(text: string) {
    return this.datePipe.transform(text, 'dd-MM-yyyy')
  }

  enableUpdateForm() {
    this.showAppointmentForm = true
  }

}
