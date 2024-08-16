import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { UserService } from 'src/app/Services/user.service'

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  titleFlag = true
  isLoggedIn$: any
  UserName$: any
  role$: any
  isAdmin: boolean = false
  isDonor: boolean = false
  isHospital: boolean = false
  name: string = ""
  constructor(private user: UserService, private router: Router) { }


  ngOnInit(): void {
    this.isLoggedIn$ = this.user.loggedInStatus
    this.UserName$ = this.user.currentUserName
    this.role$ = this.user.Role
    this.isAdmin = false
    if (this.role$.source._value == "admin") {
      this.isAdmin = true;
      console.log(this.isAdmin)
    } else if (this.role$.source._value == "donor") {
      this.isDonor = true;
    } else if (this.role$.source._value == "hospital") {
      this.isHospital = true;
      console.log("role_1",this.role$.source._value);
    }
  }

  ngOnChanges(): void {
  }



  logout() {
    this.user.logout()
    this.ngOnInit()
    this.router.navigate(['accounts/login'])
  }
}
