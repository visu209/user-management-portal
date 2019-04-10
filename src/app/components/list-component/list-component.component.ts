import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  users: User[];
  user = new User();

  dataSource: MatTableDataSource<User>;

  //this determines the order in UI irrespective of the order in html file
  displayedColumns: string[] = ['name', 'username', 'email', 'action'];

  constructor(private userService: UserService, public router: Router) { }

  ngOnInit() {
   
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      })
      this.user.isEdit = false;
      this.dataSource = new MatTableDataSource(this.users);
    });

   }

   applyFilter(filterValue: string){
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

   onSubmit() {
    if(this.user.isEdit){
      this.userService.updateUser(this.user);
      this.user.isEdit = false;
    }
    else{
      this.userService.createUser(this.user);
    }
  }

   onEdit(user: User){
      this.user.id = user.id;
      this.user.name = user.name;
      this.user.username = user.username;
      this.user.email = user.email;
      this.user.isEdit = true;
   }

   onDelete(userId: string){
      console.log(userId);
      this.userService.deleteUser(userId);
   }

   clear(){
    this.user.id = '';
    this.user.name = '';
    this.user.username = '';
    this.user.email = '';
    this.user.isEdit = false;
   }
}
