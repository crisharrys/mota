import fs from 'fs';
import path from 'path';
import { SiteSettings, Lead } from './types';

const dataDir = path.join(process.cwd(), 'data');
const settingsFile = path.join(dataDir, 'settings.json');
const leadsFile = path.join(dataDir, 'leads.json');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

export function getSettings(): SiteSettings {
  ensureDataDir();
  if (!fs.existsSync(settingsFile)) {
    const defaultSettings: SiteSettings = {
      companyName: "MOTA Serviços de Ar-Condicionado",
      legalName: "Romero Mota Climatização & Soluções Térmicas",
      ownerName: "Romero Mota",
      phone: "+55 11 94732-1510",
      whatsapp: "5511947321510",
      email: "contato@motaarcondicionado.com.br",
      address: "São Paulo - SP e Grande São Paulo",
      city: "São Paulo",
      state: "SP",
      operatingHours: "Segunda a Sábado: 08h às 19h",
      emergencySupport: "Plantão de Emergência 24h para Empresas e Contratos",
      coverageAreas: [
        "São Paulo (Capital)",
        "Zona Sul (Moema, Morumbi, Vila Mariana, Brooklin, Itaim Bibi)",
        "Zona Oeste (Pinheiros, Perdizes, Lapa, Butantã, Vila Leopoldina)",
        "Zona Leste (Tatuapé, Anália Franco, Mooca)",
        "Zona Norte (Santana, Tucuruvi, Casa Verde)",
        "Centro Expandido",
        "Alphaville e Tamboré",
        "Grande ABC (Santo André, São Bernardo, São Caetano)",
        "Guarulhos e Osasco"
      ],
      adminPasswordHash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      adminEmail: "romero@motaarcondicionado.com.br",
      smtp: {
        enabled: false,
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        user: "",
        pass: "",
        fromEmail: "notificacoes@motaarcondicionado.com.br",
        fromName: "MOTA Climatização",
        notifyEmail: "romeromota1510@gmail.com"
      }
    };
    fs.writeFileSync(settingsFile, JSON.stringify(defaultSettings, null, 2), 'utf-8');
    return defaultSettings;
  }
  const raw = fs.readFileSync(settingsFile, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing settings.json:', err);
    throw err;
  }
}

export function saveSettings(settings: Partial<SiteSettings>): SiteSettings {
  ensureDataDir();
  const current = getSettings();
  const updated: SiteSettings = {
    ...current,
    ...settings,
    smtp: {
      ...current.smtp,
      ...(settings.smtp || {})
    }
  };
  fs.writeFileSync(settingsFile, JSON.stringify(updated, null, 2), 'utf-8');
  return updated;
}

export function getLeads(): Lead[] {
  ensureDataDir();
  if (!fs.existsSync(leadsFile)) {
    fs.writeFileSync(leadsFile, JSON.stringify([], null, 2), 'utf-8');
    return [];
  }
  const raw = fs.readFileSync(leadsFile, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error parsing leads.json:', err);
    return [];
  }
}

export function addLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
  ensureDataDir();
  const leads = getLeads();
  const newLead: Lead = {
    ...leadData,
    id: 'lead_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    status: 'new',
    createdAt: new Date().toISOString()
  };
  leads.unshift(newLead);
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
  return newLead;
}

export function updateLeadStatus(id: string, status: Lead['status']): Lead | null {
  ensureDataDir();
  const leads = getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index === -1) return null;
  leads[index].status = status;
  fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8');
  return leads[index];
}

export function deleteLead(id: string): boolean {
  ensureDataDir();
  const leads = getLeads();
  const filtered = leads.filter(l => l.id !== id);
  if (filtered.length === leads.length) return false;
  fs.writeFileSync(leadsFile, JSON.stringify(filtered, null, 2), 'utf-8');
  return true;
}
