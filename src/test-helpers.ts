import fc from 'fast-check';

export class MockImageData {
  public data: Uint8ClampedArray;
  public colorSpace: PredefinedColorSpace = 'srgb';
  public width: number;
  public height: number;

  constructor(data: Uint8ClampedArray, width = 100, height = 100) {
    this.data = data;
    this.width = width;
    this.height = height;
  }
}

export function buildArbitraryImageData(width = 20, height = 20) {
  const length = width * height * 4;
  const arbitraryImageData: fc.Arbitrary<MockImageData> = fc
    .uint8ClampedArray({ minLength: length, maxLength: length })
    .filter((data) => data.length % 4 === 0)
    .map((data) => new MockImageData(data, width, height));

  return arbitraryImageData;
}
