import fc from 'fast-check';
import { MockImageData, buildArbitraryImageData } from '../test-helpers';
import { invert } from './invert';

// @ts-ignore. Good enough for tests
global.ImageData = MockImageData;

describe('invert', () => {
  describe('properties', () => {
    it('should not equal the original input', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (imageData) => {
          const result = invert(imageData);

          expect(result).not.toEqual(imageData);
        })
      );
    });

    it('should equal the original input when called on the output a second time', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (imageData) => {
          const result = invert(invert(imageData));
          expect(result).toEqual(imageData);
        })
      );
    });
  });
});
