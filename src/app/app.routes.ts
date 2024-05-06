import { Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ToasterComponent } from './toaster/toaster.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'add', component: AddUserComponent },
    { path: 'edit/:id', component: EditUserComponent },
    { path: 'toster', component: ToasterComponent },
];

