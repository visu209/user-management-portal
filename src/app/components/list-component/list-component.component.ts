import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material';

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
   
    this.userService.getAllUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      })
      this.dataSource = new MatTableDataSource(this.users)
    });

   }

   applyFilter(filterValue: string){
     this.dataSource.filter = filterValue.trim().toLowerCase();
   }

}
