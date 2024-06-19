import { Patient } from "./patient";
import { Session } from "./session";

export interface Therapist {
  id: string;
  name: string;
  email: string;
  crp: string;
  address: string;
  phone: string;
  cellphone: string;
  expertise: string;
  patients: Patient[];
  sessions: Session[];
}
