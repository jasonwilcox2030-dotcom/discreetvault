import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ═══════════════════════════════════════════════════════════════════════════
// MAJOR US CITIES - For dropdowns in admin
// ═══════════════════════════════════════════════════════════════════════════
export const US_CITIES = [
  { city: 'Los Angeles', state: 'CA', zip: '90001', x: 18, y: 60 },
  { city: 'San Francisco', state: 'CA', zip: '94101', x: 12, y: 45 },
  { city: 'San Diego', state: 'CA', zip: '92101', x: 20, y: 65 },
  { city: 'Seattle', state: 'WA', zip: '98101', x: 20, y: 18 },
  { city: 'Portland', state: 'OR', zip: '97201', x: 18, y: 25 },
  { city: 'Las Vegas', state: 'NV', zip: '89101', x: 25, y: 55 },
  { city: 'Phoenix', state: 'AZ', zip: '85001', x: 28, y: 62 },
  { city: 'Denver', state: 'CO', zip: '80202', x: 40, y: 45 },
  { city: 'Salt Lake City', state: 'UT', zip: '84101', x: 30, y: 38 },
  { city: 'Dallas', state: 'TX', zip: '75201', x: 50, y: 65 },
  { city: 'Houston', state: 'TX', zip: '77001', x: 55, y: 70 },
  { city: 'Austin', state: 'TX', zip: '78701', x: 50, y: 68 },
  { city: 'San Antonio', state: 'TX', zip: '78201', x: 48, y: 70 },
  { city: 'Kansas City', state: 'MO', zip: '64101', x: 52, y: 45 },
  { city: 'St. Louis', state: 'MO', zip: '63101', x: 58, y: 47 },
  { city: 'Chicago', state: 'IL', zip: '60607', x: 60, y: 38 },
  { city: 'Minneapolis', state: 'MN', zip: '55401', x: 55, y: 28 },
  { city: 'Milwaukee', state: 'WI', zip: '53201', x: 60, y: 33 },
  { city: 'Indianapolis', state: 'IN', zip: '46201', x: 63, y: 42 },
  { city: 'Detroit', state: 'MI', zip: '48201', x: 67, y: 32 },
  { city: 'Nashville', state: 'TN', zip: '37201', x: 62, y: 53 },
  { city: 'Memphis', state: 'TN', zip: '38101', x: 58, y: 55 },
  { city: 'Atlanta', state: 'GA', zip: '30301', x: 68, y: 60 },
  { city: 'Miami', state: 'FL', zip: '33101', x: 80, y: 80 },
  { city: 'Orlando', state: 'FL', zip: '32801', x: 76, y: 75 },
  { city: 'Tampa', state: 'FL', zip: '33601', x: 74, y: 75 },
  { city: 'Jacksonville', state: 'FL', zip: '32201', x: 74, y: 67 },
  { city: 'Charlotte', state: 'NC', zip: '28201', x: 72, y: 55 },
  { city: 'Raleigh', state: 'NC', zip: '27601', x: 75, y: 53 },
  { city: 'Washington', state: 'DC', zip: '20001', x: 80, y: 45 },
  { city: 'Baltimore', state: 'MD', zip: '21201', x: 80, y: 43 },
  { city: 'Philadelphia', state: 'PA', zip: '19101', x: 82, y: 40 },
  { city: 'New York', state: 'NY', zip: '10001', x: 82, y: 35 },
  { city: 'Boston', state: 'MA', zip: '02101', x: 88, y: 28 },
  { city: 'New Orleans', state: 'LA', zip: '70112', x: 58, y: 72 },
  { city: 'Oklahoma City', state: 'OK', zip: '73101', x: 50, y: 55 },
  { city: 'Albuquerque', state: 'NM', zip: '87101', x: 35, y: 55 },
  { city: 'Cleveland', state: 'OH', zip: '44101', x: 70, y: 35 },
  { city: 'Columbus', state: 'OH', zip: '43201', x: 68, y: 40 },
  { city: 'Cincinnati', state: 'OH', zip: '45201', x: 67, y: 43 },
  { city: 'Pittsburgh', state: 'PA', zip: '15201', x: 73, y: 38 },
];

// ═══════════════════════════════════════════════════════════════════════════
// SERVICE TIERS
// ═══════════════════════════════════════════════════════════════════════════
export const SERVICE_TIERS = [
  'Discreet Vault Same-Day',
  'Discreet Vault Overnight',
  'Discreet Vault Express',
  'Discreet Vault Priority',
];

// ═══════════════════════════════════════════════════════════════════════════
// STATUS STAGES
// ═══════════════════════════════════════════════════════════════════════════
export const STATUS_OPTIONS = [
  { stage: 1, label: 'Created' },
  { stage: 2, label: 'Picked Up' },
  { stage: 3, label: 'In Transit' },
  { stage: 4, label: 'Out for Delivery' },
  { stage: 5, label: 'Delivered' },
];

// ═══════════════════════════════════════════════════════════════════════════
// GENERATE TRACKING NUMBER (USPS-style)
// ═══════════════════════════════════════════════════════════════════════════
export function generateTrackingNumber(): string {
  const prefix = 'DV9400';
  const random = Array.from({ length: 16 }, () => Math.floor(Math.random() * 10)).join('');
  return prefix + random;
}
