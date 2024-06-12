export interface Session {
  accountDate?: string; // ISO 8601 date string
  authorizationDate?: string; // ISO 8601 date string
  hasPatientAttended: boolean;
  id: string; // UUID
  isAccounted: boolean;
  isAuthorized: boolean;
  isPaid: boolean;
  isRemote: boolean;
  patient: string;
  patientId: string; // UUID
  paymentDate?: string; // ISO 8601 date string
  sessionDate: string; // ISO 8601 date string
  sessionDuration: number; // Duration in minutes
  sessionValue: number; // Value of the session
  therapist: string;
  therapistId: string; // UUID
  token?: string;
}

export interface SessionCreate
  extends Omit<
    Session,
    | "id"
    | "therapist"
    | "patient"
    | "accountDate"
    | "authorizationDate"
    | "paymentDate"
    | "sessionDate"
  > {
  accountDate?: Date | null;
  authorizationDate?: Date | null;
  paymentDate?: Date | null;
  sessionDate: Date;
}
