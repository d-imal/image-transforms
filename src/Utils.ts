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

type IPixel = [number, number, number, number];

interface IChunkSubpixel {
  coords: [number, number];
  pixel: IPixel;
}

// TODO
// - Create chunks of pixels for each grid area that need to be averaged
// - Then map through the chunks and return a new chunk that has all the pixels in the chunk averaged
// - Then iterate through the averaged chunks and flatten them into one array
export function pixelateImage(image: ImageData, gridSize: number = 10) {
  const newImageData = new ImageData(image.width, image.height);
  const pixelChunks = makePixelChunks(image, gridSize);
  const pixelSums: IPixel[] = [];

  console.log({ pixelChunks });

  pixelChunks.forEach((pixelChunks: IChunkSubpixel[]) => {
    const pixelSum: IPixel = [0, 0, 0, 0];

    pixelChunks.forEach((currentPixel) => {
      const { pixel } = currentPixel;

      pixelSum[0] = pixelSum[0] + pixel[0];
      pixelSum[1] = pixelSum[1] + pixel[1];
      pixelSum[2] = pixelSum[2] + pixel[2];
      pixelSum[3] = pixelSum[3] + pixel[3];
    });

    pixelSums.push(pixelSum);
  });

  console.log({ pixelSums });

  return newImageData;
}

function makePixelChunks(image: ImageData, gridSize: number) {
  const pixelChunks: [IChunkSubpixel[]] = [[]];

  for (let x = 0; x < image.width; x = x + gridSize) {
    for (let y = 0; y < image.height; y = y + gridSize) {
      const chunkIndex = (y * image.width + x) * 4;

      for (let chunkX = x; chunkX < x + gridSize; chunkX++) {
        for (let chunkY = y; chunkY < y + gridSize; chunkY++) {
          const pixelIndex = (chunkY * image.width + chunkX) * 4;
          const r = image.data[pixelIndex];
          const g = image.data[pixelIndex + 1];
          const b = image.data[pixelIndex + 2];
          const a = image.data[pixelIndex + 3];

          const chunkSubpixel: IChunkSubpixel = {
            coords: [chunkX, chunkY],
            pixel: [r, g, b, a],
          };

          if (!pixelChunks[chunkIndex]) {
            pixelChunks[chunkIndex] = [chunkSubpixel];
          } else {
            pixelChunks[chunkIndex].push(chunkSubpixel);
          }
        }
      }
    }
  }

  return pixelChunks.filter((pixelChunk) => !!pixelChunk);
}
