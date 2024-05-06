import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { __param } from 'tslib';
import { ApisService } from '../Services/apis.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit {
  updateUserForm!: FormGroup;
  userId: any;

  constructor(private formBuilder: FormBuilder,
    private api: ApisService,
    private http: HttpClient,
    private activeroute: ActivatedRoute,
    private router: Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.updateUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.userId = this.activeroute.snapshot.paramMap.get('id');
    this.findUser(this.userId)

  }

  showToaster(message: any, title: any) {
    this.toast.success(message, title)
  }
  showError(message:any, title:any){
    this.toast.error(message, title)
  }
  
  moveToDefaultRoute() {
    this.router.navigate(['/']);
  }

  findUser(userId: string): void {
    this.http.get<any>(this.api.editUser + userId).subscribe(
      (user) => {
        this.updateUserForm.patchValue({
          name: user.name,
          email: user.email,
          phone: user.phone
        });
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.updateUserForm?.valid) {
      this.http.post(this.api.updateUser + this.userId, this.updateUserForm.value).subscribe((res:any) => {
        if (res) {
          this.showToaster(res.message, res.type);
          this.moveToDefaultRoute()
        }
      },
      (error:any) => {
        this.showError("An Error Occured", error.status);
      })
    }
  }
}
