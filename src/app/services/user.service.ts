import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl:string = 'http://localhost:3000/users';

  formData: User;

  constructor(private http: HttpClient, private angularFirestore: AngularFirestore) { }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  //service to fetch all the users
  getAllUsers(){
    return this.angularFirestore.collection('users').snapshotChanges();
  }

  createUser(user: User){
    return this.angularFirestore.collection('users').add(user);
  }

  updateUser(user: User){
    delete user.id;
    this.angularFirestore.doc('users/' + user.id).update(user);
  }

}
