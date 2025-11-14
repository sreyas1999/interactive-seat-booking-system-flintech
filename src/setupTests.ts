import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

(global as unknown as Record<string, unknown>).TextEncoder = TextEncoder;
(global as unknown as Record<string, unknown>).TextDecoder = TextDecoder;

// Silence React SVG attribute warnings in tests
const suppressedErrors = [
	'Invalid DOM property `stop-color`. Did you mean `stopColor`?',
	'Invalid DOM property `stop-opacity`. Did you mean `stopOpacity`?'
];

const originalError = console.error;
console.error = (...args) => {
	if (
		typeof args[0] === 'string' &&
		suppressedErrors.some(msg => args[0].includes(msg))
	) {
		return;
	}
	originalError(...args);
};