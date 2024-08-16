import { DatePipe } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Router } from '@angular/router'
import { UserService } from 'src/app/Services/user.service'


interface SelectInput {
  value: string,
  viewValue: string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [DatePipe] // Make sure to provide DatePipe
})

export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private datePipe: DatePipe
  ) { }
  passwordTyped: string = ''
  donorRegisterForm = this.fb.group({
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
    gender: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    blood: ['', [Validators.required]],
    medical_history: ['', [Validators.required]],
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

  result: any
  ngOnInit(): void { }

  register() {
    let payload = {
      ...this.donorRegisterForm.value,
      "dob": this.datePipe.transform(this.donorRegisterForm.value['dob'], 'dd-MM-yyyy'),
      "role": "donor",
      "created_at" : new Date(),
      "updated_at" : new Date(),
    }
    this.userService.register(payload).subscribe({
      next: (response) => {
        this.result = response
        this.openSnackBar('Registered Successfully', 'Ok')
        this.router.navigate(['accounts/login'])
        this.userService.addUserToLocalStorage(payload);
      },
      error: (error) => {
        this.openSnackBar(String(error).substring(7), 'Ok')
      },
      complete: () => {
        // complete sentence
      }
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['blue-snackbar'],
    })
  }

  onChange(): void {
    this.passwordTyped = this.donorRegisterForm.value.password
  }
}
