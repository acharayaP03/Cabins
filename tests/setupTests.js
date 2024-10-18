import dotenv from 'dotenv';

dotenv.config({ path: '.env.test' });

import '@testing-library/jest-dom';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
	cleanup();
});
