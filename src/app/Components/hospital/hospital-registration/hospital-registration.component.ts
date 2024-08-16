import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HospitalService } from 'src/app/Services/hospital.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'hospital-registration',
  templateUrl: './hospital-registration.component.html',
  styleUrls: ['./hospital-registration.component.css']
})
export class HospitalRegistrationComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private hospitalService: HospitalService,
  ) { }
  passwordTyped: string = ''
  hospitalRegisterForm = this.fb.group({
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
    confirmPassword: ['', [Validators.required]],
    contact: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['', [Validators.required]],
    address: ['', [Validators.required]]
  })
  result: any
  ngOnInit(): void { }

  register() {
    let payload = {
      ...this.hospitalRegisterForm.value,
      id: 1,
      "created_at" : new Date(),
      "updated_at" : new Date(),
      "role" : 'hospital',
      bloodRequests: []
    }
    
    let response = this.hospitalService.register(payload)
    if (response.success) {
      this.result = response
      console.log(this.result)
      this.openSnackBar('Registered Successfully', 'Ok')
      this.router.navigate(['accounts/login'])
    } else {
      this.openSnackBar(response.message, 'Ok')
    }
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    })
  }

  onChange(): void {
    this.passwordTyped = this.hospitalRegisterForm.value.password
  }

}
