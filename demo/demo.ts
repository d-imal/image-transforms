import { makeImageDataFromImgElement } from '../src/utils';

import { invert, pixelate } from '../src/transforms';

import styles from './styles.scss';

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
    const pixelatedImage = pixelate(imageData);

    renderImageToTable(i, pixelatedImage, 'pixelate');
  });
});

function renderImageToTable(i: number, imageData: ImageData, canvasClassName: string) {
  const canvas: HTMLCanvasElement | null = document.querySelector(
    `#transform tr:nth-child(${i + 2}) canvas.${canvasClassName}`
  );

  if (canvas) {
    canvas.width = imageData.width;
    canvas.height = imageData.height;

    canvas.getContext('2d')?.putImageData(imageData, 0, 0);
  }
}
