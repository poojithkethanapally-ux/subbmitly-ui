import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { CreateSubmissionComponent } from "./create-submission/create-submission.component";

@Component({
  selector: 'app-submission',
  imports: [DatePipe, CommonModule, CreateSubmissionComponent],
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {

  submissions = [
    { id: 1, name: 'Test 1', status: 'Pending', createdOn: new Date() },
    { id: 2, name: 'Test 2', status: 'Completed', createdOn: new Date() }
  ];

  constructor() {}

  ngOnInit(): void {}

  openCreateModal() {
    const modalElement = document.getElementById('createSubmissionModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

}
