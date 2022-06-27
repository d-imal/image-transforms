import fc from 'fast-check';
import { invert } from './invert';

describe('invert', () => {
  describe('properties', () => {
    it('should not equal the original input', () => {
      fc.assert(fc.property(fc.));
    });

    it('should equal the original input when called on the output a second time', () => {});
  });
});
