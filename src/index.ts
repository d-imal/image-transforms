import { makeImageDataFromImgElement, invertImage } from './Utils';

import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToTransform = document.querySelectorAll('#transform tr img');

  imagesToTransform.forEach((row: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(row as HTMLImageElement);

    invertImagesAndRenderToPage(imageData, i);
  });
  const imageElementToPixelate = document.querySelector('#transform tr:nth-child(2) img');
  console.log({ imageToPixelate: imageElementToPixelate });
  const imageToPixelate = makeImageDataFromImgElement(imageElementToPixelate as HTMLImageElement);

  pixelateImagesAndRenderToPage(imageToPixelate, 0);
});

function invertImagesAndRenderToPage(imageData: ImageData, i: number) {
  const invertedImage = invertImage(imageData);

  const canvas: HTMLCanvasElement | null = document.querySelector(`#transform tr:nth-child(${i + 2}) canvas.invert`);

  if (canvas) {
    canvas.width = invertedImage.width;
    canvas.height = invertedImage.height;

    canvas.getContext('2d')?.putImageData(invertedImage, 0, 0);
  }
}

function pixelateImagesAndRenderToPage(imageData: ImageData, i: number) {
  const invertedImage = invertImage(imageData);

  const canvas: HTMLCanvasElement | null = document.querySelector(`#transform tr:nth-child(${i + 2}) canvas.pixelate`);

  if (canvas) {
    canvas.width = invertedImage.width;
    canvas.height = invertedImage.height;

    canvas.getContext('2d')?.putImageData(invertedImage, 0, 0);
  }
}

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}
