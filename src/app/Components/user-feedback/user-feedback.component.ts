import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.css']
})
export class UserFeedbackComponent implements OnInit {
  dataSource: {name: string, email: string}[] = []

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.dataSource = [
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
      { name: 'Pretty Sinha', email: 'jone@doe.co.in' },
    ];
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string, isSuccess: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
    })
  }
}
