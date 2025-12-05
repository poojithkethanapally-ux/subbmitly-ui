import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { PrimarybuttonComponent } from '../../../shared/primarybutton/primarybutton.component';
import { UserCreateComponent } from '../../user-create/user-create.component';
import { MatDialog } from '@angular/material/dialog';
declare var bootstrap: any;

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, PrimarybuttonComponent, UserCreateComponent],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']   // changed to .css
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;
  error: string | null = null;

  constructor(
     private dialog: MatDialog,
    private userService: UserService) { }

  ngOnInit(): void {
  this.loadUsers();
  this.loading = false;
  
  this.userService.onUserCreated$().subscribe(() => {
    this.loadUsers();
  });
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;
    console.log("routing working")
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.error = 'Failed to load users';
        this.loading = false;
      }
    });
  }



openCreateUser() {
   const modalEl = document.getElementById('createUserModal') as HTMLElement;

  if (!modalEl) {
    console.error('Modal element not found');
    return;
  }

  const modal = new (window as any).bootstrap.Modal(modalEl);
  modal.show();
}
  
}
