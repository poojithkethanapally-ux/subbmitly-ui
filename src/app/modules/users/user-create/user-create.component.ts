import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { PrimarybuttonComponent } from '../../../shared/primarybutton/primarybutton.component';  
import { CreateUserRequest } from '../models/CreateUserModel';

declare var bootstrap: any;

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PrimarybuttonComponent],
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent {

  loading = false;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required]),
    role: new FormControl('', Validators.required)
  });

  ngOnInit() {
  this.form.statusChanges.subscribe(s => console.log("Form status:", s));
  }
  
  constructor(
    private userService: UserService,
  ) {}

  save() {
      console.log("save is hittting");
    if (this.form.invalid) return;
     console.log("save is afetr");
    this.loading = true;
    const payload: CreateUserRequest = {
    fullName: this.form.value.name!,
    email: this.form.value.email!,
    role: this.form.value.role!
  };
  
    this.userService.createUser(payload).subscribe({
      next: () => {
        this.loading = false;
        this.userService.refreshUsers();
        this.closeModal();
        this.form.reset();
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  cancel() {
    this.closeModal();
  }

  closeModal() {
  const modalEl = document.getElementById('createUserModal');
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();
}
}
