import {expect} from '@jest/globals';
import { Validation } from '../src/Login/Validation';

describe('Login', () => {
  test('successfully validates displayName', () => {
    expect(Validation('', 'hello!', 'hello!', (value) => {})).toBe(false);
    expect(Validation('Atul Jalan', 'hello!', 'hello!', (value) => {})).toBe(true);
  })
  test('validates password with confirm password', () => {
    expect(Validation('Atul Jalan', 'hello!', 'hello!', (value) => {})).toBe(true);
    expect(Validation('Atul Jalan', 'hello!', 'hello!j', (value) => {})).toBe(false);
  })
})
