import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DonorInfo } from '../../../Models/donor';
import { UserService } from 'src/app/Services/user.service';

interface SelectInput {
  value: string,
  viewValue: string
}

@Component({
  selector: 'app-schedule-appointment',
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css'],
  providers: [DatePipe]
})
export class ScheduleAppointmentComponent implements OnInit {
  currentUser: DonorInfo = {
    id: 0,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    contact: '',
    gender: '',
    dob: '',
    bloodgroup: 'A+',
    medical_history: '',
    unit: 0,
    requestedDate: '',
    created_at: '',
    updated_at: '',
    status: '',
    city: '',
    country: '',
    address: ''
  }
  loading: boolean = true;
  formSubmissionStatus: boolean;
  showAppointmentForm: boolean;
  minDate = new Date();

  appointmentFormNew = this.fb.group({
    requestedDate: ['', [Validators.required]],
    bloodgroup: ['', [Validators.required]],
    unit: ['', [Validators.required]],
    medical_history: ['', [Validators.required]]
  })

  bloodUnits: SelectInput[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
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
    private datePipe: DatePipe,
  ) {
    this.currentUser = this.userService.getUser()[0];
    console.log("this", this.currentUser);
    
    this.formSubmissionStatus = false

    this.showAppointmentForm = (this.currentUser !== undefined && this.currentUser.requestedDate) === '';
    
  }

  ngOnInit(): void {
    this.loading = false
  }

  registerAppointment() {
    console.log(this.appointmentFormNew.value, this.currentUser)
    let donorsList = this.userService.getAllDonors();
    // Find the index of the object with the specified ID
    const userDataIndex = donorsList.findIndex((obj: DonorInfo) => obj.id === this.currentUser.id);

    if (userDataIndex !== -1) {
      donorsList = [
        ...donorsList.slice(0, userDataIndex),
        {
          ...donorsList[userDataIndex],
          bloodgroup: this.appointmentFormNew.value.bloodgroup,
          medical_history: this.appointmentFormNew.value.medical_history,
          unit: this.appointmentFormNew.value.unit,
          requestedDate: this.appointmentFormNew.value.requestedDate,
        },
        ...donorsList.slice(userDataIndex + 1)
      ];

      // update the details into local storage
      this.userService.updateDonorsDetails(donorsList)

      this.currentUser = {
        ...this.currentUser,
        requestedDate : this.appointmentFormNew.value.requestedDate,
        bloodgroup: this.appointmentFormNew.value.bloodgroup
      }

      // reset form value
      this.appointmentFormNew.reset()
        
      this.formSubmissionStatus = true
      this.showAppointmentForm = false
      setTimeout(() => {
        this.formSubmissionStatus = false
      },5000)
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
