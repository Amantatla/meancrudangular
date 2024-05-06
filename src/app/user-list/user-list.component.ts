import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApisService } from '../Services/apis.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  users: any = [];

  constructor(private http: HttpClient, private api: ApisService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.getAllUser();
  }

  showToaster(message: any, title: any) {
    this.toast.success(message, title)
  }
  showError(message: any, title: any) {
    this.toast.error(message, title)
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
      (res: any) => {
        console.log("res:", res)
        this.toast.success(res.message, res.title)
        this.getAllUser()
      },
      (error: any) => {
        this.toast.error("An Error Occured", error.title)


      }
    );
  }
}

