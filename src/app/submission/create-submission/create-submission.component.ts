import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubmissionService } from '../../services/submissions.service';
import { User } from '../../users/models/user.model';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbTypeaheadModule],
  templateUrl: './create-submission.component.html',
  styleUrls: ['./create-submission.component.css']
})
export class CreateSubmissionComponent implements OnInit {

  form!: FormGroup;
  users: User[] = [];
  candidates: User[] = [];
  recruiters: User[] = [];
  candidateInvalid = false;
  recruiterInvalid = false;


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
      submissionName: ['', Validators.required],
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
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    console.log('Submitting:', this.form.value);
  }

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
