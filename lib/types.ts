export interface Lead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  roomSize?: string;
  environmentType?: string;
  preferredTime?: string;
  message?: string;
  status: 'new' | 'contacted' | 'quoted' | 'closed' | 'archived';
  createdAt: string;
  ip?: string;
}

export interface SMTPSettings {
  enabled: boolean;
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  fromEmail: string;
  fromName: string;
  notifyEmail: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  ownerName: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  operatingHours: string;
  emergencySupport: string;
  coverageAreas: string[];
  adminPasswordHash: string; // SHA-256 or simple hashed secret for the admin area
  adminEmail: string;
  smtp: SMTPSettings;
}
