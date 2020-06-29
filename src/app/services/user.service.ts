import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UserService {

  serviceUrl: string = 'http://localhost:8090/';

  formData: User;

  constructor(private http: HttpClient, private router: Router) { }

  //service to fetch all the users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serviceUrl + 'users');
  }

  //service to create a new user
  public createUser(user: User) {
    return this.http.post<any>(this.serviceUrl + 'user', {
      email: user.email,
      name: user.name,
      username: user.username
    });
  }

  //service to update an existing user
  updateUser(user: User) {
    return this.http.put<User>(this.serviceUrl + 'users', [{
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username
    }]);
  }

  //service to delete a user
  deleteUser(userId: string) {
    const url = `${this.serviceUrl}user/${userId}`;
    return this.http.delete<User>(url);
  }

}
