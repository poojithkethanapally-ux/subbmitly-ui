export interface CreateSubmissionRequest {
  candidateId: number;
  recruiterId: number;

  status: string;

  submissionDate: string; // yyyy-MM-dd

  clientName: string;

  vendorName?: string;
  vendorContactName?: string;
  vendorContactEmail?: string;
  vendorContactPhone?: string;

  implementationPartner?: string;

  jobTitle?: string;
  jobDescription?: string;
  requiredSkills?: string;

  rate: number | null;

  location?: string;
  candidateLocation?: string;

  employmentType?: string;
}
