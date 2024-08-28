import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jiurbmilzfknigyvywsf.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImppdXJibWlsemZrbmlneXZ5d3NmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDgxMzQ0NiwiZXhwIjoyMDQwMzg5NDQ2fQ.RHMGPcUHZEzrFSV7yHrQOy1l5XDXXCqiVQMeC3h3U5g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
