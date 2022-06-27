function invertImage(image: ImageData) {
  const { data } = image;
  const imageData = new ImageData(image.width, image.height);

  for (let i = 0; i < data.length; i += 4) {
    imageData.data[i] = Math.abs(data[i] - 255);
    imageData.data[i + 1] = Math.abs(data[i + 1] - 255);
    imageData.data[i + 2] = Math.abs(data[i + 2] - 255);
    imageData.data[i + 3] = data[i + 3];
  }

  return imageData;
}

export default invertImage;
