import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //json-server url
  usersUrl:string = 'http://localhost:3000/users';

  formData: User;

  constructor(private http: HttpClient, private angularFirestore: AngularFirestore, private router: Router) { }

  //earlier implementation of get with JSONServer
  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  //service to fetch all the users
  getAllUsers(){
    return this.angularFirestore.collection('users').snapshotChanges();
  }

  //service to create a new user
  createUser(user: User){
    return this.angularFirestore.collection('users').add({
      id: this.angularFirestore.createId,
      name: user.name,
      username: user.username,
      email: user.email
    });
  }

  updateUser(user: User){
    delete user.id;
    this.angularFirestore.doc('users/' + user.id).update(user);
  }

}
