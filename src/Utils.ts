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
  return image;
}
