export interface Professional {
  id: string;
  name: string;
  profession: string;
  company?: string;
  avatar?: string;
  description?: string;
  location?: string;
  preferences?: string[];
  industry?: string;
  experience?: number;
  status?: 'openToWork' | 'hiring' | 'open';
  skills?: string[];
  education?: string;
  certifications?: string[];
  languages?: string[];
}
  
export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  description?: string;
}