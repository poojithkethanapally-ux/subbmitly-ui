import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../users/models/user.model';
import { CreateSubmissionRequest } from '../submission/models/CreateSubmission';
import { SubmissionResponse } from '../submission/models/SubmissionResponse';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

    private baseUrl = environment.apiUrl;
  refreshSubmissions$ = new BehaviorSubject<void>(undefined);;

  constructor(private http: HttpClient) { }

//   getCandidates(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/candidates`);
//   }

//   getRecruiters(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.baseUrl}/recruiters`);
//   }

   getSubmissions() {
    return this.http.get<SubmissionResponse[]>(`${this.baseUrl}/submission/getSubmissions`);
  }

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/userProfile/getUserInfo`);
  }

  refreshSubmissions(): void {
    this.refreshSubmissions$.next();
  }

  onSubmissionCreated(): Observable<void> {
    return this.refreshSubmissions$.asObservable();
  }

  createSubmission(payload: CreateSubmissionRequest): Observable<any> {
    console.log("creating submission with payload:", payload);
    return this.http.post(`${this.baseUrl}/submission/createSubmission`, payload);
  }
}
