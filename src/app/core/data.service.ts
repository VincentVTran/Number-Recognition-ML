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

  retrievePrediction(body:any):Observable<any>{
    console.log("Sending expected number; Retrieving predicted number")
    return this.http.post<any>(this.baseURL+"/predict",body);
  }

  trainingSet():Observable<any>{
    console.log("Sending expected number; Retrieving predicted number")
    return this.http.get<any>(this.baseURL+"/pre-train");
  }

  saveModel():Observable<any>{
    console.log("Sending expected number; Retrieving predicted number")
    return this.http.get<any>(this.baseURL+"/save");
  }
}
