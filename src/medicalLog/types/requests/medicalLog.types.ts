export interface CreateInteractionRequest {
  walletAddress: string;
  patientProfile: any; // Use IPatientProfile if needed
  activityLog?: any[];
  summary?: string;
}
