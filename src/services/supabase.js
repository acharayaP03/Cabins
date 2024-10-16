import { createClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../appConfig';
console.log(supabaseUrl, supabaseKey);
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
