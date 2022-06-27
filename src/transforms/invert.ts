export function invert(image: ImageData) {
  const { data } = image;
  const transformedData = new Uint8ClampedArray(data.length);

  for (let i = 0; i < data.length; i += 4) {
    transformedData[i] = Math.abs(data[i] - 255);
    transformedData[i + 1] = Math.abs(data[i + 1] - 255);
    transformedData[i + 2] = Math.abs(data[i + 2] - 255);
    transformedData[i + 3] = data[i + 3];
  }

  return new ImageData(transformedData, image.width, image.height);
}

export function invertImageDataArray(imageData: Uint8ClampedArray) {
  const transformedimageData = new Uint8ClampedArray(imageData.length);

  for (let i = 0; i < imageData.length; i += 4) {
    transformedimageData[i] = Math.abs(imageData[i] - 255);
    transformedimageData[i + 1] = Math.abs(imageData[i + 1] - 255);
    transformedimageData[i + 2] = Math.abs(imageData[i + 2] - 255);
    transformedimageData[i + 3] = imageData[i + 3];
  }

  return transformedimageData;
}
