import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent implements OnInit {
  searchField: string = ''
  getMatchingData: any

  @Output()
  searchDataText: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  searchFieldData() {
    console.log("working fine", this.searchField);
    // this.
  }

  getSearchFieldData() {
    this.searchDataText.emit(this.searchField)
  }

  clearSearchField() {
    this.searchField = ''
    this.searchDataText.emit('')
  }

}
