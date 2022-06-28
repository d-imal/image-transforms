import fc from 'fast-check';

export class MockImageData {
  public data: Uint8ClampedArray;
  public colorSpace: PredefinedColorSpace = 'srgb';
  public width = 100;
  public height = 100;

  constructor(data: Uint8ClampedArray) {
    this.data = data;
  }
}

export function buildArbitraryImageData() {
  const arbitraryImageData: fc.Arbitrary<MockImageData> = fc
    .uint8ClampedArray({ minLength: 40, min: 4 })
    .filter((data) => data.length % 4 === 0)
    .map((data) => new MockImageData(data));

  return arbitraryImageData;
}
