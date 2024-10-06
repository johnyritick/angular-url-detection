import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './Components/login/login.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { RegisterPageComponent } from './Components/register-page/register-page.component'
import { AdminGuard } from './Guard/admin.guard'
import { AuthGuard } from './Guard/auth.guard'
import { DashboardComponent } from './Components/dashboard/dashboard.component'
// import { ScheduleAppointmentComponent } from './Components/donor/schedule-appointment/schedule-appointment.component'
// import { DonorListComponent } from './Components/donor/donor-list/donor-list.component'
// import { HospitalListComponent } from './Components/hospital/hospital-list/hospital-list.component'
// import { InventoryComponent } from './Components/inventory/inventory.component'
// import { RequestBloodComponent } from './Components/hospital/request-blood/request-blood.component'
import { UrlDetectorComponent } from './Components/url-detector/url-detector.component'
import { BulkUrlDetectorComponent } from './Components/bulk-url-detector/bulk-url-detector.component'
import { TokenExpiredComponent } from './Components/token-expired/token-expired.component'
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component'
import { FaqComponent } from './Components/faq/faq.component'
import { UrlFeedbackComponent } from './Components/url-feedback/url-feedback.component'
import { UserFeedbackComponent } from './Components/user-feedback/user-feedback.component'
import { CustomGraphComponent } from './Components/custom-graph/custom-graph.component'
import { ManagerUserComponent } from './Components/manager-user/manager-user.component'

const routes: Routes = [
  { path: 'homepage', component: LoginComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'token-expired', component: TokenExpiredComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  // { path: 'donor/list', canActivate: [AdminGuard], component: DonorListComponent },
  // { path: 'donor/schedule-appointment', canActivate: [AuthGuard], component: ScheduleAppointmentComponent },
  { path: 'panel/url-detector', canActivate: [AuthGuard], component: UrlDetectorComponent },
  { path: 'panel/bulk-url-detector', canActivate: [AuthGuard], component: BulkUrlDetectorComponent },
  // { path: 'hospital/blood-requirement', canActivate: [AdminGuard] ,component: HospitalListComponent },
  // { path: 'hospital/request-blood', component: RequestBloodComponent },
  // { path: 'panel/faq', canActivate: [AuthGuard], component: FaqComponent },
  { path: 'panel/url-feedback', canActivate: [AuthGuard], component: UrlFeedbackComponent },
  { path: 'panel/user-feedback', canActivate: [AdminGuard], component: UserFeedbackComponent },
  { path: 'panel/dashboard', canActivate: [AdminGuard], component: DashboardComponent }, // auth guard
  { path: 'panel/graph', canActivate: [AdminGuard], component: CustomGraphComponent }, // auth guard
  { path: 'panel/manage-users', canActivate: [AdminGuard], component: ManagerUserComponent }, // auth guard
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() { }
}
