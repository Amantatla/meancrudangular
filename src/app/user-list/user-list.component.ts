import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApisService } from '../Services/apis.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any = [];

  constructor(private http: HttpClient, private api: ApisService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser() {
    this.http.get(this.api.base).subscribe(data => {
      this.users = data;
    }),
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
  }

  deleteUser(userid: any) {
    this.http.delete(this.api.deleteUser + userid).subscribe(
      (res) => {
        console.log("res:", res)
        this.getAllUser()
      },
      (error) => {
        console.log("An Error Occured", error)
      }
    );
  }

}

