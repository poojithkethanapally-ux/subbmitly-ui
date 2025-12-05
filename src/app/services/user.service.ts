import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modules/users/models/user.model';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../modules/users/models/CreateUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/userProfile/getUserInfo`);
  }


  createUser(payload: CreateUserRequest): Observable<any> {
    console.log(payload);
    return this.http.post(`${this.baseUrl}/userProfile/createUser`, payload);
  }

}
