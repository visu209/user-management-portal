import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {

  user = new User();

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  saveUser() {
    this.userService.createUser(this.user);
    this.router.navigate(['/list']);
  }

}
