import fc from 'fast-check';
import { invert, invertImageDataArray } from './invert';

describe('invert', () => {
  describe('properties', () => {
    it('should not equal the original input', () => {
      fc.assert(
        fc.property(
          fc.uint8ClampedArray({
            minLength: 4,
          }),
          (array) => {
            const result = invertImageDataArray(array);
            expect(result).not.toEqual(array);
          }
        )
      );
    });

    it('should equal the original input when called on the output a second time', () => {
      fc.assert(
        fc.property(
          fc.uint8ClampedArray({
            minLength: 4,
          }),
          (array) => {
            const result = invertImageDataArray(invertImageDataArray(array));
            expect(result).toEqual(array);
          }
        )
      );
    });
  });
});
