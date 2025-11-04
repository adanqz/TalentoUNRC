import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-potential-candidates.ts';
import '@/ai/flows/suggest-relevant-opportunities.ts';
import '@/ai/flows/suggest-suitable-candidates.ts';
import '@/ai/flows/opportunity-crud.ts';
import '@/ai/flows/student-crud.ts';
