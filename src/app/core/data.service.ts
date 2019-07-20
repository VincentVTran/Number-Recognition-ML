import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private baseURL:string = "http://localhost:3000"
  constructor(private http: HttpClient) {
  }

  retrievePrediction(expectedNumber){
    console.log("Sending expected number; Retrieving predicted number")
    return this.http.post<any>(this.baseURL+"/predict",expectedNumber);
  }
}
