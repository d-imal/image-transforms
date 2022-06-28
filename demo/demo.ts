import { makeImageDataFromImgElement } from '../src/utils';

import { invert, pixelate } from '../src/transforms';

import styles from './styles.scss';

/*
 * Quick and dirty page for demoing image transforms in a browser. This probably
 * won't scale as lots of transforms are added, but it's good enough for now. As
 * new transforms are added, look for a more scalable way of demoing them.
 */

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToTransform = document.querySelectorAll('#transform tr img');

  imagesToTransform.forEach((imageElement: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(imageElement as HTMLImageElement);
    const invertedImage = invert(imageData);

    renderImageToTable(i, invertedImage, 'invert');
  });

  imagesToTransform.forEach((imageElement: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(imageElement as HTMLImageElement);
    const pixelatedImage = pixelate(imageData, 20);

    renderImageToTable(i, pixelatedImage, 'pixelate');
  });
});

// Note: This is dependent on having a table with id `transform` with columns
// for each transform type and canvas elements in each column with the class
// name of the transform type
function renderImageToTable(i: number, imageData: ImageData, canvasClassName: string) {
  const canvas: HTMLCanvasElement | null = document.querySelector(
    `#transform tr:nth-child(${i + 2}) canvas.${canvasClassName}`
  );

  if (canvas) {
    const context = canvas.getContext('2d');

    canvas.width = imageData.width;
    canvas.height = imageData.height;

    if (context) {
      context.putImageData(imageData, 0, 0);
    } else {
      throw new Error(`Canvas context not created for ".${canvasClassName}"`);
    }
  } else {
    throw new Error(
      `The canvas element for ".${canvasClassName}" wasn't found! Is the classname correct? Did the structure of the table DOM change?`
    );
  }
}
