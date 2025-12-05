import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../users/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

    private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

//   getCandidates(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/candidates`);
//   }

//   getRecruiters(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/recruiters`);
//   }

  getUsers() {
    console.log("getting users");
      return this.http.get<User[]>(`${this.baseUrl}/userProfile/getUserInfo`);
    }

  createSubmission(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/submissions`, payload);
  }
}
