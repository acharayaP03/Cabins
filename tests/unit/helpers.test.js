import { describe, it, expect } from 'vitest';
import { formatCurrency, spreadPropsToInput, mapToSnakeCase } from '../../src/utils/helpers';

describe('formatCurrency', () => {
	it('formats a number into USD currency', () => {
		expect(formatCurrency(1000)).toBe('$1,000.00');
		expect(formatCurrency(0)).toBe('$0.00');
		expect(formatCurrency(-500.5)).toBe('-$500.50');
	});
});

describe('spreadPropsToInput', () => {
	it('spreads object properties correctly', () => {
		const props = { id: 'input1', type: 'text', value: 'Test' };
		const result = spreadPropsToInput(props);
		expect(result).toEqual(props); // Same properties should be spread
	});

	it('returns an empty object when no props are given', () => {
		const result = spreadPropsToInput({});
		expect(result).toEqual({});
	});
});

describe('mapToSnakeCase', () => {
	it('converts camelCase keys to snake_case', () => {
		const input = { maxCapacity: 100, regularPrice: 50, someValue: 'test' };
		const expected = {
			max_capacity: 100,
			regular_price: 50,
			some_value: 'test',
		};
		const result = mapToSnakeCase(input);
		expect(result).toEqual(expected);
	});

	it('handles empty objects gracefully', () => {
		const result = mapToSnakeCase({});
		expect(result).toEqual({});
	});

	it('works with nested objects (but only converts top-level keys)', () => {
		const input = { nestedObject: { innerKey: 'value' }, anotherKey: 42 };
		const expected = {
			nested_object: { innerKey: 'value' },
			another_key: 42,
		};
		const result = mapToSnakeCase(input);
		expect(result).toEqual(expected);
	});
});
