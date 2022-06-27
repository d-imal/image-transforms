import fc from 'fast-check';
import { invert, invertImageDataArray } from './invert';

describe('invertImageDataArray', () => {
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

function buildArbitraryImageData() {
  const arbitraryImageData: fc.Arbitrary<ImageData> = fc
    .uint8ClampedArray({ minLength: 4 })
    .filter((data) => data.length % 4 === 0)
    .map((data) => {
      return new ImageData(data, 100, 100);
    });

  return arbitraryImageData;
}

describe('invert', () => {
  describe('properties', () => {
    it('should not equal the original input', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (array) => {
          const result = invert(array);
          expect(result).not.toEqual(array);
        })
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
