import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { viewClassName } from '@angular/compiler';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
   }

}
