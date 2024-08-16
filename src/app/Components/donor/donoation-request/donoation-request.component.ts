import { Component, OnInit } from '@angular/core';
import { DonorInfo } from 'src/app/Models/donor';
import { DonorData } from '../helper';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-donoation-request',
  templateUrl: './donoation-request.component.html',
  styleUrls: ['./donoation-request.component.css']
})
export class DonoationRequestComponent implements OnInit {
  loading: boolean = true
  dataSource: DonorInfo[] = []
  displayedColumns: string[] = []
  paginationData: PageEvent = {
    "previousPageIndex": 0,
    "pageIndex": 0,
    "pageSize": 10,
    "length": 0
  }
  constructor() { }

  ngOnInit(): void {
    this.getData()

  }

  getData() {
    setTimeout(() => {
      this.paginationData.length = DonorData.length
      this.loading = false
    }, 2000)
  }

  searchData(event: string) {

  }

  viewAddress(donorId: number) {

  }

  onPageChange(event: PageEvent) {

  }

}
