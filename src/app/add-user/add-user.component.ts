import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApisService } from '../Services/apis.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  addUserForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private api: ApisService,
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }
  showToaster(message: any, title: any) {
    this.toast.success(message, title)
  }
  showError(message: any, title: any) {
    this.toast.error(message, title)
  }
  moveToDefaultRoute() {
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    debugger
    if (this.addUserForm?.valid) {
      this.http.post(this.api.addUser, this.addUserForm.value).subscribe(
        (res: any) => {
          console.log("User added Succesfully", res);
          if (res) {
            this.showToaster(res.message, res.title);
            this.moveToDefaultRoute()
          }
        },
        (error:any) => {
          this.showError("An Error Occured", error.status);
        })
    }
  }
}
