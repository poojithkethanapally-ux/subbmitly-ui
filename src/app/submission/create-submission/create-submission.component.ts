import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubmissionService } from '../../services/submissions.service';
import { User } from '../../users/models/user.model';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateSubmissionRequest } from '../models/CreateSubmission';
import bootstrap from 'bootstrap';

@Component({
  selector: 'app-create-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule],
  templateUrl: './create-submission.component.html',
  styleUrls: ['./create-submission.component.css']
})
export class CreateSubmissionComponent implements OnInit {
  @Output() submissionCreated = new EventEmitter<void>();

  form!: FormGroup;
  users: User[] = [];
  candidates: User[] = [];
  recruiters: User[] = [];
  candidateInvalid = false;
  recruiterInvalid = false;
  loading: boolean | undefined;


  constructor(
    private fb: FormBuilder,
    private submissionService: SubmissionService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.loadUsers();
  }

  buildForm() {
    this.form = this.fb.group({
      candidateId: ['', Validators.required],
      recruiterId: ['', Validators.required],
      // submissionName: ['', Validators.required],
      status: ['Submitted', Validators.required],
      client: [''],
      rate: [''],
      location: ['']
    });
  }

  loadUsers() {
    this.submissionService.getUsers().subscribe(res => {
      this.users = res;

      this.candidates = res.filter(u => u.role?.toLowerCase() === 'candidate');
      this.recruiters = res.filter(u => u.role?.toLowerCase() === 'recruiter');

      console.log("Candidates:", this.candidates);
      console.log("Recruiters:", this.recruiters);
    });
  }

  submit() {
  if (this.candidateInvalid || this.recruiterInvalid || this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const request: CreateSubmissionRequest = {
      candidateId: this.form.value.candidateId,
       recruiterId: this.form.value.recruiterId,

      status: this.form.value.status,
      submissionDate: this.form.value.submissionDate,  // yyyy-MM-dd

      clientName: this.form.value.client,

      vendorName: this.form.value.vendorName,
      vendorContactName: this.form.value.vendorContactName,
      vendorContactEmail: this.form.value.vendorContactEmail,
      vendorContactPhone: this.form.value.vendorContactPhone,

      implementationPartner: this.form.value.implementationPartner,

      jobTitle: this.form.value.jobTitle,
      jobDescription: this.form.value.jobDescription,
      requiredSkills: this.form.value.requiredSkills,

      rate: this.form.value.rate,
      location: this.form.value.location,
      candidateLocation: this.form.value.candidateLocation,

      employmentType: this.form.value.employmentType
    };

    console.log("Final request:", request);

    this.submissionService.createSubmission(request).subscribe({
      next: () => {
        this.loading = false;
        this.submissionService.refreshSubmissions();
        this.form.reset();
        this.submissionCreated.emit();
      },
      error: (err) => {
        console.error("Submission failed:", err);
      }
    });
  }

  //  cancel() {
  //   this.closeModal();
  // }

  // closeModal() {
  // const modalEl = document.getElementById('createSubmissionModal');
  // const modal = bootstrap.Modal.getInstance(modalEl);
  // modal.hide();


  // --------------------------
  // TYPEAHEAD FOR CANDIDATES
  // --------------------------
  searchCandidates = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.candidates
              .filter(v => v.fullName.toLowerCase().includes(term.toLowerCase()))
              .slice(0, 10)
      )
    );
  };

  // --------------------------
  // TYPEAHEAD FOR RECRUITERS
  // --------------------------
  searchRecruiters = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term =>
        term.length < 1
          ? []
          : this.recruiters
              .filter(v => v.fullName.toLowerCase().includes(term.toLowerCase()))
              .slice(0, 10)
      )
    );
  };

  // Formatter
  formatter = (x: any) => x.fullName;

  onCandidateSelect(event: any) {
    this.form.patchValue({
      candidateId: event.item.userId
    });
  }

  onRecruiterSelect(event: any) {
    this.form.patchValue({
      recruiterId: event.item.userId
    });
  }

  validateCandidateInput(event: any) {
    const inputValue = event.target.value?.trim().toLowerCase();

    const match = this.candidates.find(c => 
      c.fullName.toLowerCase() === inputValue
    );

    if (!match) {
      this.candidateInvalid = true;
      this.form.patchValue({ candidateId: '' }); // reset selection
    } else {
      this.candidateInvalid = false;
    }
  }

  validateRecruiterInput(event: any) {
    const inputValue = event.target.value?.trim().toLowerCase();

    const match = this.recruiters.find(r => 
      r.fullName.toLowerCase() === inputValue
    );

    if (!match) {
      this.recruiterInvalid = true;
      this.form.patchValue({ recruiterId: '' }); // reset
    } else {
      this.recruiterInvalid = false;
    }
  }

  focusNext(nextField: any) {
    setTimeout(() => {
      nextField.focus();
    }, 10);
  }

}
