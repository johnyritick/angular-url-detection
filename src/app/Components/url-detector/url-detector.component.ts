import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-url-detector',
  templateUrl: './url-detector.component.html',
  styleUrls: ['./url-detector.component.css']
})
export class UrlDetectorComponent implements OnInit {
  dataSource: {}[] = []
  url: string;
  selectedModel: string;
  loader: boolean;
  feedBackLoader: boolean;
  showUrlInputForm: boolean;
  urlReport: {
    status: string,
    report: {}
  }
  models = [
    { key: 'Decision Tree', value: 'decision_tree' },
    { key: 'Ada Boost', value: 'adaboost' },
    { key: 'Random Forest', value: 'random_forest' },
    { key: 'XG Boost', value: 'xgboost' }
  ];
  displayedColumns: string[] = [
    'key', 'value'
  ]
  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
  ) {
    this.url = ""
    this.selectedModel = ""
    this.loader = false
    this.feedBackLoader = false
    this.showUrlInputForm = true
    this.urlReport = {
      status: "",
      report: {}
    }
  }

  ngOnInit(): void {
  }

  isReportEmpty(): boolean {
    return Object.keys(this.urlReport.report).length === 0;
  }

  viewMore() {
    this.loader = true
    this.http.post("http://0.0.0.0:80/ml/feature-detail", { url: this.url }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.showUrlInputForm = false
          this.urlReport = {
            ...this.urlReport,
            report: response.detail?.[0]
          }
          let temp: {}[] = [];
          Object.keys(response.detail[0]).map((item) => {
            if (typeof response.detail[0][item] === "string") {
              temp.push({
                key: item,
                value: response.detail[0][item]
              })
            }
          })
          console.log("temp data", temp);

          this.dataSource = temp
        } else {
          this.openSnackBar(response.message, "Ok")
        }
      },
      error: (error) => {
        this.openSnackBar(error.message, "Ok")
      },
      complete: () => {
        this.loader = false
      }
    })
  }

  async searchUrlData() {
    this.loader = true
    this.http.post("http://0.0.0.0:80/ml/predict", { url: this.url, model: this.selectedModel }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.showUrlInputForm = false
          this.urlReport = {
            ...this.urlReport,
            status: response.result
          }
        } else {
          this.openSnackBar(response.message, "Ok")
        }
      },
      error: (error) => {
        this.openSnackBar(error.message, "Ok")
      },
      complete: () => {
        this.loader = false
      }
    })
  }

  feedbackAction(key: string) {
    this.feedBackLoader = true
    this.http.post("http://0.0.0.0:80/user/submit-feedback", {
      "url": this.url,
      "predicted_flag": this.urlReport.status,
      "user_feedback": key
    }).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.openSnackBar(response.message ?? "Feedback submitted", "OK", true)
        } else {
          this.openSnackBar(response.message ?? "Failed to submit feedback", "OK")
        }
      },
      error: (error) => {
        this.openSnackBar("Failed to submit feedback", "OK")
      },
      complete: () => {
        this.feedBackLoader = false
      }
    })
  }

  openSnackBar(message: string, action: string, isSuccess: boolean = false) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: isSuccess ? ['green-snackbar'] : ['red-snackbar'],
    })
  }
}
