import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { HospitalService } from 'src/app/Services/hospital.service'
import { UserService } from 'src/app/Services/user.service'

interface SelectInput {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    role: ['', [Validators.required]]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private hospitalService: HospitalService,
    private _snackBar: MatSnackBar,
  ) {

  }

  ngOnInit(): void { }

  result: any
  userDetails: any
  userName: string = ''

  loginRoles: SelectInput[] = [
    { value: 'donor', viewValue: "Donor" },
    { value: 'hospital', viewValue: "Hospital" },
    { value: 'admin', viewValue: "Admin" }
  ]

  login() {
    if (this.loginForm.value.role === "donor") {
      this.userService.doLogin(this.loginForm.value).subscribe({
        next: (response: any) => {
          this.userDetails = this.userService.parseJwtToken(response.auth_token)
          if (response.success) {
            this.userName = this.userDetails.name
            this.userService.loginUser(
              response.auth_token,
              this.loginForm.value.email,
              this.userName,
              this.loginForm.value.password,
              this.userDetails.role,
            )
            this.openSnackBar(response.message, 'Ok', true)
            this.router.navigate(['dashboard'])
          } else {
            this.openSnackBar(response.message, 'Ok')
          }
        },
        error: (error) => {
          this.openSnackBar(error.error.message, 'Ok')
        }
      })
    } else if (this.loginForm.value.role === "admin") {

      let response = this.userService.validateAdmin(this.loginForm.value.email, this.loginForm.value.password)
      console.log("e", response);

      this.setDataIntoLocalStorage(response)
    } else {
      let response: any = this.hospitalService.login(this.loginForm.value)
      this.setDataIntoLocalStorage(response);
    }
  }
  openSnackBar(message: string, action: string, isSuccess: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
    })
  }

  setDataIntoLocalStorage(response: any) {
    if (response.success) {
      this.userName = response.user_details.name
      this.userService.loginUser(
        response.auth_token,
        this.loginForm.value.email,
        this.userName,
        this.loginForm.value.password,
        this.loginForm.value.role,
      )
      this.openSnackBar(response.message, 'Ok', true)
      this.router.navigate(['dashboard'])
    } else {
      this.openSnackBar(response.message, 'Ok')
    }
  }
}
