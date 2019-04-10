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
    console.log(JSON.stringify(user));
    return this.angularFirestore.collection('users').add({
      email: user.email,
      name: user.name,
      username: user.username
    });
  }

  //service to update an existing user
  updateUser(user: User){
    this.angularFirestore.doc('users/' + user.id).update({
      email: user.email,
      name: user.name,
      username: user.username
    });
  }

  //service to delete a user
  deleteUser(userId: string){
    this.angularFirestore.doc('users/' + userId).delete();
  }

}
