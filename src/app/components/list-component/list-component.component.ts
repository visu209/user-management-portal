import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material';

const ELEMENT_DATA: User[] = [
  {id: 1, name: 'Leanne Graham', username: 'Bret', email: 'Sincere@april.biz'},
  {id: 1, name: 'Ervin Howell', username: 'Antonette', email: 'Shanna@melissa.tv'},
];

@Component({
  selector: 'app-list-component',
  templateUrl: './list-component.component.html',
  styleUrls: ['./list-component.component.css']
})
export class ListComponentComponent implements OnInit {

  users: User[];
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'action'];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users)
    });
   }

   applyFilter(filterValue: string){
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

}
