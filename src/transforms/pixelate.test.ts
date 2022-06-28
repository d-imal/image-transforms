import fc from 'fast-check';
import { MockImageData, buildArbitraryImageData } from '../test-helpers';

import { pixelate } from './pixelate';

// @ts-ignore. Good enough for tests
global.ImageData = MockImageData;

describe('pixelate', () => {
  describe('properties', () => {
    test('the output should not equal the input ', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (imageData) => {
          const result = pixelate(imageData);

          expect(result).not.toEqual(imageData);
        })
      );
    });

    test('the average color value of all pixels in the output should equal the average color value of all pixels in the input', () => {
      fc.assert(
        fc.property(buildArbitraryImageData(), (imageData) => {
          const result = pixelate(imageData);
          console.log('imageData', imageData.data);
          console.log('result', imageData.data);

          const averageInput = imageData.data.reduce((acc, item) => acc + item) / imageData.data.length;
          const averageOutput = imageData.data.reduce((acc, item) => acc + item) / result.data.length;

          console.log({ averageInput, averageOutput });

          expect(averageOutput).toEqual(averageInput);
        })
      );
    });
  });
});
