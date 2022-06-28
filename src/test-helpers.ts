import fc from 'fast-check';

const RGBA_SIZE = 4;

export class MockImageData {
  public data: Uint8ClampedArray;
  public colorSpace: PredefinedColorSpace = 'srgb';
  public width: number;
  public height: number;

  constructor(data: Uint8ClampedArray, width: number, height: number) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
}

export function buildArbitraryImageData(width = 20, height = 20): fc.Arbitrary<MockImageData> {
  const length = width * height * RGBA_SIZE;

  return fc
    .uint8ClampedArray({ minLength: length, maxLength: length })
    .filter((data) => data.length % RGBA_SIZE === 0)
    .map((data) => new MockImageData(data, width, height));
}
