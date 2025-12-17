import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { CreateSubmissionComponent } from "./create-submission/create-submission.component";
import { SubmissionResponse } from './models/SubmissionResponse';
import { SubmissionService } from '../services/submissions.service';

@Component({
  selector: 'app-submission',
  imports: [DatePipe, CommonModule, CreateSubmissionComponent],
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent implements OnInit {
  submissions: SubmissionResponse[] = [];
  loading = true;
  error: string | null = null;
  modal: bootstrap.Modal | null = null;

  constructor(
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.loadSubmissions();
      this.submissionService.onSubmissionCreated().subscribe(() => {
    this.loadSubmissions();
  });
  }

  loadSubmissions(): void {
    this.loading = true;
    this.error = null;
    this.submissionService.getSubmissions().subscribe({
      next: (data) => {
        console.log("Submissions:", data);
        this.submissions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching submissions:', err);
        this.error = 'Failed to load submissions';
        this.loading = false;
      }
    });
  }

  openCreateModal() {
    const modalElement = document.getElementById('createSubmissionModal');
    if (modalElement) {
      this.modal = new bootstrap.Modal(modalElement);
      this.modal.show();
    }
  }

  closeCreateModal() {
    if (this.modal) {
      this.modal.hide();
    }
  }
}
