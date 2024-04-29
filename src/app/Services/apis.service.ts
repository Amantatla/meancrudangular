import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  readonly base = "http://localhost:3000/";
  readonly addUser = this.base + "add";
  readonly editUser = this.base + "edit/";
  readonly updateUser = this.base + "update/";
  readonly deleteUser = this.base + "delete/";

  constructor() { }
}
