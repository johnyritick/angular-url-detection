import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LoginComponent } from './Components/login/login.component'
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component'
import { RegisterPageComponent } from './Components/register-page/register-page.component'
import { AdminGuard } from './Guard/admin.guard'
import { AuthGuard } from './Guard/auth.guard'
import { HomePageComponent } from './Components/home-page/home-page.component'
import { DashboardComponent } from './Components/dashboard/dashboard.component'
import { ScheduleAppointmentComponent } from './Components/donor/schedule-appointment/schedule-appointment.component'
import { DonorListComponent } from './Components/donor/donor-list/donor-list.component'
import { HospitalListComponent } from './Components/hospital/hospital-list/hospital-list.component'
import { InventoryComponent } from './Components/inventory/inventory.component'
import { RequestBloodComponent } from './Components/hospital/request-blood/request-blood.component'

const routes: Routes = [
  { path: 'homepage', component: HomePageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'accounts/login', component: LoginComponent },
  { path: 'donor/list', canActivate: [AdminGuard], component: DonorListComponent },
  { path: 'donor/schedule-appointment', canActivate: [AuthGuard], component: ScheduleAppointmentComponent },
  { path: 'hospital/blood-requirement', canActivate: [AdminGuard] ,component: HospitalListComponent },
  { path: 'hospital/request-blood', component: RequestBloodComponent },
  { path: 'inventory',canActivate: [AdminGuard] , component: InventoryComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent }, // auth guard
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
