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

// TODO
// - Create chunks of pixels for each grid area that need to be averaged
// - Then map through the chunks and return a new chunk that has all the pixels in the chunk averaged
// - Then iterate through the averaged chunks and flatten them into one array
export function pixelateImage(image: ImageData, gridSize: number = 5) {
  const { data } = image;
  const imageData = new ImageData(image.width, image.height);

  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const i = (y * image.width + x) * 4;
      console.log({ x, y });

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
    }
  }

  return imageData;
}
