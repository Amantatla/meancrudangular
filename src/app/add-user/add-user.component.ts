import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApisService } from '../Services/apis.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit(): void {
    this.addUserForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }
  moveToDefaultRoute() {
    this.router.navigate(['/']);
  }
  onSubmit(): void {
    if (this.addUserForm?.valid) {
      debugger
      this.http.post(this.api.addUser, this.addUserForm.value).subscribe(
        (res) => {
          console.log("User added Succesfully", res);
        },
        (error) => {
          console.error('Error adding user:', error);
        })
      }
      this.moveToDefaultRoute()
  }
}
