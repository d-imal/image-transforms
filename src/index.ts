import { makeImageDataFromImgElement, invertImage, pixelateImage } from './Utils';

import styles from './styles.scss';

window.addEventListener('load', async () => {
  document.body.className = styles.body;

  const imagesToTransform = document.querySelectorAll('#transform tr img');

  imagesToTransform.forEach((imageElement: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(imageElement as HTMLImageElement);

    invertImagesAndRenderToPage(imageData, i);
  });

  imagesToTransform.forEach((imageElement: Element, i: number) => {
    const imageData = makeImageDataFromImgElement(imageElement as HTMLImageElement);

    pixelateImagesAndRenderToPage(imageData, i);
  });
  // const imageElementToPixelate = document.querySelector('#transform tr:nth-child(2) img');
  // const imageToPixelate = makeImageDataFromImgElement(imageElementToPixelate as HTMLImageElement);

  // pixelateImagesAndRenderToPage(imageToPixelate, 0);
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
  const pixelatedImage = pixelateImage(imageData);

  const canvas: HTMLCanvasElement | null = document.querySelector(`#transform tr:nth-child(${i + 2}) canvas.pixelate`);

  if (canvas) {
    canvas.width = pixelatedImage.width;
    canvas.height = pixelatedImage.height;

    canvas.getContext('2d')?.putImageData(pixelatedImage, 0, 0);
  }
}

function createElement(tagName: keyof HTMLElementTagNameMap, innerHTML?: string, options?: ElementCreationOptions) {
  const element = document.createElement(tagName, options);

  if (innerHTML) {
    element.innerHTML = innerHTML;
  }

  return element;
}
