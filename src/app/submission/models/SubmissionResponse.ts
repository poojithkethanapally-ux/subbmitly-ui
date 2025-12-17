export interface SubmissionResponse {
  submissionId: number;
  candidateId: number;
  candidateName?: string | null;
  recruiterId: number;
  recruiterName?: string | null;
  clientName: string;
  vendorName?: string | null;
  jobTitle?: string | null;
  jobDescription?: string | null;
  requiredSkills?: string | null;
  rate?: number | null;
  location?: string | null;
  employmentType?: string | null;
  submissionDate: string; // ISO date string from server
  currentStatus?: string | null;
  createdDate: string; // ISO date string
}
