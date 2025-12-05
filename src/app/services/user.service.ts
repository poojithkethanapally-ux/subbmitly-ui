import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modules/users/models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { CreateUserRequest } from '../modules/users/models/CreateUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;
  private refreshUsers$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/userProfile/getUserInfo`);
  }

  refreshUsers(): void {
    this.refreshUsers$.next();
  }

  onUserCreated$(): Observable<void> {
    return this.refreshUsers$.asObservable();
  }

  createUser(payload: CreateUserRequest): Observable<any> {
    console.log(payload);
    return this.http.post(`${this.baseUrl}/userProfile/createUser`, payload);
  }

}
