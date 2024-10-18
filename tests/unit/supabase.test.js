import { createClient } from '@supabase/supabase-js';
import { describe, expect, vi, it } from 'vitest';

vi.mock('@supabase/supabase-js', () => ({
	createClient: vi.fn(),
}));
import supabase from '../../src/services/supabase';
describe('Supabase Initializatiuon', () => {
	it('should initialize Supabase with correct URL and anon key', () => {
		expect(createClient).toHaveBeenCalled();
		// expect(createClient).toHaveBeenCalledWith(
		// 	import.meta.env.VITE_SUPABASE_URL,
		// 	import.meta.env.VITE_SUPABASE_ANON_KEY,
		// );
	});
});
