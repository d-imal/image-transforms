import { IPixel } from '../types';

/*
 * Pixelating is just averaging the colors within each larger "pixel" area
 * The algorithm implemented here:
 * - Create chunks of pixels for each grid area that need to be averaged
 * - Then iterate through the chunks and return a new chunk that has all the pixels in the chunk averaged
 * - Then iterate through the averaged chunks and flatten them into one array
 */

// The format for storing the chunks
interface IGridChunk {
  coords: [number, number]; // These are coordinates in the "chunk" grid, not pixel coordinates
  subpixels: IChunkSubpixel[];
  average?: IPixel;
}

interface IChunkSubpixel {
  coords: [number, number];
  pixel: IPixel;
}

export function pixelate(image: ImageData, gridSize: number = 10) {
  const gridChunks = makeGridChunks(image, gridSize);
  const averagePixelChunks = makeAveragePixelChunks(gridChunks, gridSize);
  const newImageDataArray: IPixel[] = [];

  // Place the averaged grid chunks into a data array at the correct index
  averagePixelChunks.forEach((pixelChunk) => {
    pixelChunk.subpixels.forEach((subpixel: IChunkSubpixel) => {
      const chunkIndex = getInitialIndexForCoord(subpixel.coords[0], subpixel.coords[1], image.width);

      newImageDataArray[chunkIndex] = subpixel.pixel;
    });
  });

  const flatArray = new Uint8ClampedArray(newImageDataArray.flat());

  return new ImageData(flatArray, image.width, image.height);
}

function getInitialIndexForCoord(x: number, y: number, width: number) {
  return x * 4 + y * (width * 4);
}

function makeAveragePixelChunks(gridChunks: IGridChunk[], gridSize: number): IGridChunk[] {
  // Augment each gridChunk in gridChunks with its average pixel
  gridChunks.forEach((gridChunk: IGridChunk) => {
    const pixelSum: IPixel = [0, 0, 0, 0];

    gridChunk.subpixels.forEach((currentPixel) => {
      const { pixel } = currentPixel;

      pixelSum[0] = pixelSum[0] + pixel[0];
      pixelSum[1] = pixelSum[1] + pixel[1];
      pixelSum[2] = pixelSum[2] + pixel[2];
      pixelSum[3] = pixelSum[3] + pixel[3];
    });

    const chunkPixelAmount = gridSize ** 2;

    gridChunk.average = [
      pixelSum[0] / chunkPixelAmount,
      pixelSum[1] / chunkPixelAmount,
      pixelSum[2] / chunkPixelAmount,
      pixelSum[3] / chunkPixelAmount,
    ];
  });

  // Convert that to an array of IGridChunks with each subpixel filled in with the average
  return gridChunks.map((gridChunk) => {
    return {
      ...gridChunk,
      subpixels: gridChunk.subpixels.map((subpixel: IChunkSubpixel) => {
        return {
          coords: subpixel.coords,
          pixel: gridChunk.average as IPixel,
        };
      }),
    };
  });
}

// Convert the image to an array of "chunks"
function makeGridChunks(image: ImageData, gridSize: number): IGridChunk[] {
  const gridChunks: IGridChunk[] = [];

  for (let x = 0; x < image.width; x = x + gridSize) {
    for (let y = 0; y < image.height; y = y + gridSize) {
      const chunkIndex = getInitialIndexForCoord(x, y, image.width);

      for (let chunkX = x; chunkX < x + gridSize; chunkX++) {
        for (let chunkY = y; chunkY < y + gridSize; chunkY++) {
          const pixelIndex = getInitialIndexForCoord(chunkX, chunkY, image.width);

          const r = image.data[pixelIndex];
          const g = image.data[pixelIndex + 1];
          const b = image.data[pixelIndex + 2];
          const a = image.data[pixelIndex + 3];

          const chunkSubpixel: IChunkSubpixel = {
            coords: [chunkX, chunkY],
            pixel: [r, g, b, a],
          };

          if (!gridChunks[chunkIndex]) {
            gridChunks[chunkIndex] = {
              coords: [chunkX, chunkY],
              subpixels: [chunkSubpixel],
            };
          } else {
            gridChunks[chunkIndex].subpixels.push(chunkSubpixel);
          }
        }
      }
    }
  }

  return gridChunks.filter((pixelChunk) => !!pixelChunk);
}

export default pixelate;
