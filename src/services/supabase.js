import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../appConfig';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
