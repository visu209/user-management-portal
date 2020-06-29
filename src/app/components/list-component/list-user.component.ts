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

  isDeleteEnabled: Boolean = this.selection.selected.length > 0 ? true : false;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.loadAllUsers();
  }

  loadAllUsers(){
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.user.isEdit = false;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
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

  deleteSelected() {
    this.selection.selected.forEach(async item => {
      let user: User = this.users.find(d => d === item);
      await this.userService.deleteUser(user.id).subscribe();
      // this.users.splice(index,1)
      // this.dataSource = new MatTableDataSource<User>(this.users);
    });
    this.loadAllUsers();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async onSubmit() {
    if (this.user.isEdit) {
      await this.userService.updateUser(this.user).subscribe();
      this.user.isEdit = false;
      this.loadAllUsers();
    }
    else {
      await this.userService.createUser(this.user);
      this.loadAllUsers();
    }
  }

  onEdit(user: User) {
    this.user.id = user.id;
    this.user.name = user.name;
    this.user.username = user.username;
    this.user.email = user.email;
    this.user.isEdit = true;
  }

  onDelete(userId: string) {
    console.log(userId);
    this.userService.deleteUser(userId).subscribe(result => {
      this.router.navigate(['/list']);
    }, error => console.error(error));
  }

  clear() {
    this.user.id = '';
    this.user.name = '';
    this.user.username = '';
    this.user.email = '';
    this.user.isEdit = false;
  }
}
