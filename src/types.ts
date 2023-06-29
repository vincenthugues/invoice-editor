export interface ServiceProvision {
  id: number;
  heading: string;
  details: string;
  hours: number;
}

export interface InvoiceDraft {
  number?: number;
  clientName?: string;
  patientName?: string;
  rate?: number;
}

export interface Invoice extends InvoiceDraft {
  id: number;
  number: number;
  date: Date;
  clientName: string;
  patientName: string;
  rate: number;
  serviceProvisions: ServiceProvision[];
}

export type PersonalInfo = {
  name?: string;
  personalDetails?: string;
  contactInfo?: string;
  siret?: string;
};
