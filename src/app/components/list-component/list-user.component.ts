import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-component',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  user = new User();

  dataSource: MatTableDataSource<User>;

  //this determines the order in UI irrespective of the order in html file
  displayedColumns: string[] = ['select', 'name', 'username', 'email', 'action'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<User>(true, []);

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  isBulkDeleteDisabled(){
    console.log(this.selection.selected.length);
    return this.selection.selected.length > 0 ? false : true;
  }

  /** load all users **/
  loadAllUsers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.user.isEdit = false;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
    },
      error => {
        console.log(error);
      });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** delete selected users **/
  deleteSelected() {
    this.selection.selected.forEach(item => {
      let user: User = this.users.find(d => d === item);
      this.userService.deleteUser(user.id).subscribe(
        response => {
          console.log(response);
          this.loadAllUsers();
        },
        error => {
          console.log(error);
        });
      // this.users.splice(index,1)
      // this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }

  /** apply search filter to datatable **/
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** create and edit user **/
  onSubmit() {
    if (this.user.isEdit) {
      this.userService.updateUser(this.user).subscribe(
        response => {
          console.log(response);
          this.loadAllUsers();
        },
        error => {
          console.log(error);
        });
      this.user.isEdit = false;
    }
    else {
      this.userService.createUser(this.user).subscribe(
        response => {
          console.log(response);
          this.clear();
          this.loadAllUsers();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  /** delete the user **/
  onDelete(userId: string) {
    this.userService.deleteUser(userId).subscribe(
      response => {
        console.log(response);
        this.loadAllUsers();
      },
      error => {
        console.log(error);
      });
  }

  /** set the edit user to the edit form **/
  onEdit(user: User) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.username = user.username;
    this.user.email = user.email;
    this.user.isEdit = true;
  }

  /** reset the edit form container after edit and create **/
  clear() {
    this.user.id = '';
    this.user.name = '';
    this.user.username = '';
    this.user.email = '';
    this.user.isEdit = false;
  }
}
