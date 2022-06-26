let canvas: HTMLCanvasElement;
let context: CanvasRenderingContext2D | null;

type IPixel = [number, number, number, number];

interface IChunkSubpixel {
  coords: [number, number];
  pixel: IPixel;
}

interface IGridChunk {
  coords: [number, number];
  subpixels: IChunkSubpixel[];
  average?: IPixel;
}

interface IAverageGridChunk {
  coords: [number, number];
  average: IPixel;
}

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

export function pixelateImage(image: ImageData, gridSize: number = 10) {
  const pixelChunks = makeGridChunks(image, gridSize);
  const averagePixelChunks = makeAveragePixelChunks(pixelChunks, gridSize);

  // console.log({ averagePixelChunks });
  const newImageDataArray: IPixel[] = [];

  averagePixelChunks.forEach((pixelChunk) => {
    // console.log({ pixelChunks });

    pixelChunk.subpixels.forEach((subpixel: IChunkSubpixel) => {
      // console.log({ subpixel });

      const chunkIndex = (subpixel.coords[0] * image.width + subpixel.coords[1]) * 4;
      // console.log({ chunkIndex });

      newImageDataArray[chunkIndex] = subpixel.pixel;
    });
  });

  const flatImageData = newImageDataArray.flat();
  // console.log({ newImageDataArray, flatImageData });

  const newImageData = new ImageData(new Uint8ClampedArray(flatImageData), image.width, image.height);

  return newImageData;
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

function makeGridChunks(image: ImageData, gridSize: number): IGridChunk[] {
  const gridChunks: IGridChunk[] = [];

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
