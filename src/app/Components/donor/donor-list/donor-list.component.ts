import { Component, OnInit } from '@angular/core';
import { DonorInfo } from '../../../Models/donor';
// import { DonorData } from '../helper';
import { DatePipe } from '@angular/common';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css'],
  providers: [DatePipe]
})
export class DonorListComponent implements OnInit {
  dataSource: DonorInfo[] = []
  allDataSource: DonorInfo[] = []
  loading: boolean = true
  displayedColumns: string[] = [
    'id', 'name',
    'disease', 'age',
    'bloodgroup', 'unit',
    'requestedDate', 'status',
    'actions',
    // 'email', 'city','details'
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
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getDonorList()
    // console.log(this.dataSource);

  }

  viewIndividualDetails(donorId: string) {
    this.individualProfileData = this.dataSource.filter((items) => items.id === +donorId)
    this.openProfileModal = false
    this.openProfileModal = true
  }

  getDonorList() {
    setTimeout(() => {
      // set the data into main array
      let donorsList: any = JSON.parse(localStorage.getItem("donorsList") || "[]");

      if (donorsList == null || !donorsList.length) {
        // donorsList = DonorData
      } else {
        donorsList = [
          ...donorsList,
          // ...DonorData
        ]
      }

      this.allDataSource = donorsList
      this.paginationData.length = donorsList.length % this.paginationData.pageSize === 0 ?
        donorsList.length / this.paginationData.pageSize :
        Number((donorsList.length / this.paginationData.pageSize).toFixed(0)) + 1
      this.updateTableRows(donorsList)
    }, 2000)
  }

  onPageChange(event: any) {
    this.loading = true;
    this.paginationData = event

    //this will update the number of rows in table
    this.updateTableRows(this.allDataSource)
  }

  updateTableRows(data: DonorInfo[]) {

    // set data as per number of items in page
    let skipFrom = this.paginationData.pageIndex * this.paginationData.pageSize
    let skipUpto = (this.paginationData.pageIndex * this.paginationData.pageSize) + this.paginationData.pageSize

    let filteredData = data.filter((items, index) => index >= (skipFrom) && index < skipUpto)
    this.dataSource = filteredData
    this.loading = false;
  }

  getMatchingData(event: string) {
    let data: DonorInfo[] = [];
    if (!isNaN(+event)) {
      data = this.allDataSource.filter((items) => items.id === +event)
    } else if (event.includes('@')) {
      data = this.allDataSource.filter((items) => items.email.includes(event))
    } else {
      data = this.allDataSource.filter((items) => items.name.includes(event))
    }
    if (data.length) {
      this.updateTableRows(data)
    } else {
      this.dataSource = []
    }
  }

  ageCalculator(date: string) {
    let trimedData = date.split("-");
    let currentYear: string = (this.datePipe.transform(new Date(), 'yyyy') || trimedData[2])
    return (+currentYear) - (+trimedData[2]);
  }

  updateDonorStatus(id: number, status: string) {
    // Find the index of the object with the specified ID
    const userDataIndex = this.allDataSource.findIndex(obj => obj.id === id);

    if (userDataIndex !== -1) {
      this.loading = true;

      // Create a new array reference with the updated object
      this.allDataSource = [
        ...this.allDataSource.slice(0, userDataIndex), // Before the updated object
        {
          ...this.allDataSource[userDataIndex],
          status: status // Update the status
        },
        ...this.allDataSource.slice(userDataIndex + 1) // After the updated object
      ];

      this.userService.updateDonorsDetails(this.allDataSource)

      this.updateTableRows(this.allDataSource)

      this.loading = false;
    } else {
      // Show snack bar
    }
  }

  convertDate(text: string) {
    return this.datePipe.transform(text, 'dd-MM-yyyy')
  }

}
