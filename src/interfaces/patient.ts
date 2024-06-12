import { Session } from "@/interfaces/session";

export interface Patient {
  id: string;
  therapistId: string;
  therapist: string;
  insuranceId: string;
  insurance: string;
  name: string;
  imgUrl: string;
  cpf: string;
  email: string;
  address: string;
  phone: string;
  cellphone: string;
  emergencyContact: string;
  emergencyContactPhone: string;
  records: string;
  sessions: Session[];
}
