import fc from 'fast-check';
import { MockImageData, buildArbitraryImageData } from '../test-helpers';
import { IPixel } from '../types';

import { pixelate } from './pixelate';

// @ts-ignore. Good enough for tests
global.ImageData = MockImageData;

function getAveragePixelValues(imageDataArray: Uint8ClampedArray) {
  const sums = [0, 0, 0, 0];

  for (let i = 0; i < imageDataArray.length; i = i + 4) {
    sums[i] = imageDataArray[i];
    sums[i + 1] = imageDataArray[i + 1];
    sums[i + 2] = imageDataArray[i + 2];
    sums[i + 3] = imageDataArray[i + 3];
  }

  return [
    Math.floor(sums[0] / imageDataArray.length),
    Math.floor(sums[1] / imageDataArray.length),
    Math.floor(sums[2] / imageDataArray.length),
    Math.floor(sums[3] / imageDataArray.length),
  ];
}

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
          const averageInput = getAveragePixelValues(imageData.data);
          const averageOutput = getAveragePixelValues(result.data);

          expect(averageOutput).toEqual(averageInput);
        })
      );
    });
  });

  test('each pixel on each pixelated area of the image should be the same', () => {
    fc.assert(
      fc.property(buildArbitraryImageData(), (imageData) => {
        const gridSize = 10;
        const result = pixelate(imageData, 5);
        const { width, height } = imageData;
        const gridAreaColors: Record<string, IPixel> = {};

        for (let i = 0; i < imageData.data.length; i = i + 4) {
          const x = ((i % (width * 4)) / (width * 4)) * width;
          const y = (Math.floor(i / (height * 4)) / height) * height;

          const pixel: IPixel = [result.data[i], result.data[i + 1], result.data[i + 2], result.data[i + 3]];

          const key = `${Math.floor(x / gridSize)},${Math.floor(y / gridSize)}`;

          if (!gridAreaColors[key]) {
            // console.log(key);

            gridAreaColors[key] = pixel;
          } else {
            expect(pixel).toEqual(gridAreaColors[key]);
          }
        }
      })
    );
  });
});
