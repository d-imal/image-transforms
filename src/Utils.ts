let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

export function makeImageDataFromImgElement(image: HTMLImageElement) {
  if (!canvas) {
    canvas = document.createElement('canvas');
  }

  if (!context) {
    context = canvas.getContext('2d');
  }

  canvas.width = image.width;
  canvas.height = image.height;

  if (!context) {
    throw new Error('Canvas context not created');
  }

  context.drawImage(image, 0, 0);

  return context.getImageData(0, 0, image.width, image.height);
}

export function invertImage(image: ImageData) {
  if (!context) {
    throw new Error('Canvas context not created');
  }

  const { data } = image;
  const imageData = context.createImageData(image.width, image.height);

  for (let i = 0; i < data.length; i += 4) {
    imageData.data[i] = Math.abs(data[i] - 255);
    imageData.data[i + 1] = Math.abs(data[i + 1] - 255);
    imageData.data[i + 2] = Math.abs(data[i + 2] - 255);
    imageData.data[i + 3] = data[i + 3];
  }

  return imageData;
}
