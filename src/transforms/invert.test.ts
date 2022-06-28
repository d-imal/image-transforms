import fc from 'fast-check';
import { invert } from './invert';

class MockImageData {
  public data: Uint8ClampedArray;
  public colorSpace: PredefinedColorSpace = 'srgb';
  public width = 100;
  public height = 100;

  constructor(data: Uint8ClampedArray) {
    this.data = data;
  }
}

// @ts-ignore. Good enough for tests
global.ImageData = MockImageData;

function buildArbitraryImageData() {
  const arbitraryImageData: fc.Arbitrary<MockImageData> = fc
    .uint8ClampedArray({ minLength: 4 })
    .filter((data) => data.length % 4 === 0)
    .map((data) => {
      return new MockImageData(data);
    });

  return arbitraryImageData;
}

describe('invert', () => {
  describe('properties', () => {
    it('should not equal the original input', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (array) => {
          const result = invert(array);
          // console.log({ array, result });

          expect(result).not.toEqual(array);
        })
      );
    });

    it('should equal the original input when called on the output a second time', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (array) => {
          const result = invert(invert(array));
          expect(result).toEqual(array);
        })
      );
    });
  });
});
